const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transactionController')

/**
 * @swagger
 * tags:
 *   name: Transactions - User
 *   description: API for CRUD transactions (for user role)
 */

/**
 * @swagger
 * /user/transactions:
 *   get:
 *     summary: Show transactions list
 *     tags: [Transactions - User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show all transactions by user list
 *       400:
 *         description: All transactions data are empty
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(0), transactionController.GetAllTransactionsByUserController)

/**
 * @swagger
 * /user/transactions/{transactionCode}:
 *   get:
 *     summary: Show transaction detail information
 *     tags: [Transactions - User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionCode
 *         in: path
 *         required: true
 *         description: transaction code parameter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully show detail transaction information
 *       400:
 *         description: detail transaction not found
 */
router.get("/:transactionCode", authMiddleware.userAuthentication, authMiddleware.checkRole(0), transactionController.GetOneTransactionController)

/**
 * @swagger
 * /user/transactions:
 *   post:
 *     summary: Creating a new transaction
 *     tags: [Transactions - User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerUuid:
 *                 type: string
 *               roomCode:
 *                 type: string
 *               roomType:
 *                 type: string
 *               transactionPrice:
 *                 type: string
 *               transactionQuantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A new transaction are succesfully created
 *       400:
 *         description: A transaction code is registered
 *       500:
 *         description: Error bad request
 */
router.post("/", authMiddleware.userAuthentication, authMiddleware.checkRole(0), transactionController.CreateTransactionController)

module.exports = router