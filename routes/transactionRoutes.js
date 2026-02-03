const express = require('express');
const router = express.Router();
const {createTransaction, getTransactions, editTransaction, getTransactionById} = require('../controllers/transactionController');
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Get user transactions - protected route
router.get("/", protect, getTransactions);

/**
 * @swagger
 * /v1/transactions:
 *   post:
 *     summary: Perform a credit or debit transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaction successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 */
//Make a transaction - protected route
router.post("/", protect, createTransaction);

/**
 * @swagger
 * /v1/transactions/{id}:
 *   put:
 *     summary: update a single transaction by ID (Admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transaction found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 *
 */
//edit a transaction - admin only
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  editTransaction
);
/**
 * @swagger
 * /v1/transactions/{id}:
 *   get:
 *     summary: Get a single transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
//get single transaction - protected route
router.get("/:id", protect, getTransactionById);

module.exports = router;