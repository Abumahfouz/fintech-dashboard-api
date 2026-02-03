const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// Create transaction controller
// @route   POST /api/v1/transactions
// @desc    Create a new transaction
const createTransaction = async (req, res) => {
    const {type, amount, description, currency} = req.body;
    try {
        if (!type || !amount || !currency) {
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        if (!['credit', 'debit'].includes(type)) {
            return res.status(400).json({message: 'Invalid transaction type'});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        let balanceAfterTransaction;
        let balance = user.balance;
        if (type === 'credit') {
            balanceAfterTransaction = user.balance + amount;
        } else {
            if (amount > user.balance) {
                return res.status(400).json({message: 'Insufficient funds'});
            }
            balanceAfterTransaction = user.balance - amount;
        }
        const transaction = new Transaction({
            type,
            amount,
            description,
            currency,
            balanceAfterTransaction,
            user: userId
        });
        await transaction.save();
        await User.findByIdAndUpdate(userId, {balance: balanceAfterTransaction});
        res.status(201).json({message: 'Transaction created successfully', transaction});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

// Get transactions controller
// @route   GET /api/transactions
// @desc    Get all transactions for a user
const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const transactions = await Transaction.find({user: userId}).sort({createdAt: -1});
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({message: 'No transactions found'});
        }
        res.status(200).json({transactions, user, balance: user.balance});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

// Edit transaction controller (Admin only)
// @route   PUT /api/transactions/:id
// @desc    Edit a transaction by ID
const editTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const {type, amount, description, currency, status} = req.body;
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        const newTransactionData = {};
        if (type) {
            if (!['credit', 'debit'].includes(type)) {
                return res.status(400).json({message: 'Invalid transaction type'});
            }
            newTransactionData.type = type;
        }
        if (amount) newTransactionData.amount = amount;
        if (description) newTransactionData.description = description;
        if (currency) newTransactionData.currency = currency;
        if (status) newTransactionData.status = status;

        const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, newTransactionData, {new: true});
        res.status(200).json({message: 'Transaction updated successfully', transaction: updatedTransaction});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};


// Get single transaction by ID controller
// @route GET /api/transactions/:id
// @desc Get a single transaction by ID
const getTransactionById = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        res.status(200).json({transaction});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

module.exports = {createTransaction, getTransactions, editTransaction, getTransactionById};