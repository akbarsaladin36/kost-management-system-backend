const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transactionController')

/**
 * @swagger
 * tags:
 *   name: Transactions - Admin
 *   description: API for CRUD transactions (for admin role)
 */


/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Show transactions list
 *     tags: [Transactions - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show all transactions list
 *       400:
 *         description: All transactions data are empty
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(2), transactionController.GetAllTransactionsController)

/**
 * @swagger
 * /admin/transactions/{transactionCode}:
 *   get:
 *     summary: Show transaction detail information
 *     tags: [Transactions - Admin]
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
router.get("/:transactionCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), transactionController.GetOneTransactionController)

/**
 * @swagger
 * /admin/transactions:
 *   post:
 *     summary: Creating a new transaction
 *     tags: [Transactions - Admin]
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
router.post("/", authMiddleware.userAuthentication, authMiddleware.checkRole(2), transactionController.CreateTransactionController)

/**
 * @swagger
 * /admin/transactions/{transactionCode}:
 *   patch:
 *     summary: Updating an existing transaction data
 *     tags: [Transactions - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionCode
 *         in: path
 *         required: true
 *         description: transaction code parameter
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionStatus:
 *                 type: integer
 *     responses:
 *       200:
 *         description: An existing transaction data are updated
 *       400:
 *         description: A transaction data are not found
 *       500:
 *         description: Error bad request
 */
router.patch("/:transactionCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), transactionController.UpdateTransactionController)

/**
 * @swagger
 * /admin/transactions/{transactionCode}:
 *   delete:
 *     summary: Delete transaction detail information
 *     tags: [Transactions - Admin]
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
 *         description: Succesfully delete detail transaction information
 *       400:
 *         description: detail transaction not found
 */
router.delete("/:transactionCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), transactionController.DeleteTransactionController)


module.exports = router