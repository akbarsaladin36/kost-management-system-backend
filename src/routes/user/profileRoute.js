const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const profileController = require('../../controllers/profileController')

/**
 * @swagger
 * tags:
 *   name: Profile - User
 *   description: API for profile user (for user role)
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Show user profile information
 *     tags: [Profile - User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show profile user information
 *       400:
 *         description: a user profile data not found
 *       500:
 *         description: error bad request
 */
router.get("/",authMiddleware.userAuthentication,authMiddleware.checkRole(0),profileController.GetProfileController)

/**
 * @swagger
 * /user/profile:
 *   patch:
 *     summary: Updating a user profile information data
 *     tags: [Profile - User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: A profile data are updated
 *       400:
 *         description: A profile data are not found
 *       500:
 *         description: Error bad request
 */
router.patch("/",authMiddleware.userAuthentication,authMiddleware.checkRole(0),profileController.UpdateProfileController)

module.exports = router