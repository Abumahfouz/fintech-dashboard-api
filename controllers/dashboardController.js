const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// Dashboard controller
// @route   GET /api/dashboard/summary
// @desc    Get dashboard summary data
const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const transactions = await Transaction.find({user: userId});

        const balance = transactions.reduce((acc, txn) => {
            return txn.type === 'credit' ? acc + txn.amount : acc - txn.amount;
        }, 0);

        const totalTransactions = transactions.length;
        const completedTransactions = transactions.filter(txn => txn.status === 'completed').length;
        const pendingTransactions = transactions.filter(txn => txn.status === 'pending').length;
        const failedTransactions = transactions.filter(txn => txn.status === 'failed').length;

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage || ''
            },
            summary: {
                balance,
                totalTransactions,
                completedTransactions,
                pendingTransactions,
                failedTransactions
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

module.exports = {getDashboardSummary};