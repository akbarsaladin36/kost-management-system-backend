const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const transactionController = require('../../controllers/transactionController')

/**
 * @swagger
 * tags:
 *   name: Transactions - Owner
 *   description: API for CRUD transactions (for owner role)
 */

/**
 * @swagger
 * /owner/transactions:
 *   get:
 *     summary: Show transactions list
 *     tags: [Transactions - Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show all transactions by owner list
 *       400:
 *         description: All transactions data are empty
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(1), transactionController.GetAllTransactionsByOwnerController)

/**
 * @swagger
 * /owner/transactions/{transactionCode}:
 *   get:
 *     summary: Show transaction detail information
 *     tags: [Transactions - Owner]
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
router.get("/:transactionCode", authMiddleware.userAuthentication, authMiddleware.checkRole(1), transactionController.GetOneTransactionController)


module.exports = router