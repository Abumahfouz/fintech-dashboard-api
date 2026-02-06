const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['credit', 'debit'] },
    amount: { type: Number, required: true, min: [0, 'Amount must be positive'] },
    balanceAfterTransaction: { type: Number, required: true, min: [0, 'Balance cannot be negative'] },
    description: { type: String },
    currency: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;