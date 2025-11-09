const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const authMiddleware = require('../../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for authentication like register and login
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: A user are succesfully created
 *       400:
 *         description: A user are registered
 *       403:
 *         description: Cannot access this api because user logged in
 *       500:
 *         description: Error bad request
 */
router.post("/register", authMiddleware.checkGuest, authController.RegisterController)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with registered username and password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User are succesfully login
 *       400:
 *         description: User are not registered
 *       403:
 *         description: Cannot access this api because user logged in
 *       500:
 *         description: Error bad request
 */
router.post("/login", authMiddleware.checkGuest, authController.LoginController)

module.exports = router