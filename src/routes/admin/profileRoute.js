const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const profileController = require('../../controllers/profileController')

/**
 * @swagger
 * tags:
 *   name: Profile - Admin
 *   description: API for profile admin (for admin role)
 */

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Show admin profile information
 *     tags: [Profile - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show profile admin information
 *       400:
 *         description: an admin profile data not found
 *       500:
 *         description: error bad request
 */
router.get("/",authMiddleware.userAuthentication,authMiddleware.checkRole(2),profileController.GetProfileController)

/**
 * @swagger
 * /admin/profile:
 *   patch:
 *     summary: Updating a admin profile information data
 *     tags: [Profile - Admin]
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
router.patch("/",authMiddleware.userAuthentication,authMiddleware.checkRole(2),profileController.UpdateProfileController)

module.exports = router