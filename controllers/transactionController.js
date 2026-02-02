const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// Create transaction controller
// @route   POST /api/transactions
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

module.exports = {createTransaction};