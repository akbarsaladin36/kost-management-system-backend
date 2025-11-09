const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const profileController = require('../../controllers/profileController')

/**
 * @swagger
 * tags:
 *   name: Profile - Owner
 *   description: API for profile owner (for owner role)
 */

/**
 * @swagger
 * /owner/profile:
 *   get:
 *     summary: Show user profile information
 *     tags: [Profile - Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show profile owner information
 *       400:
 *         description: an owner profile data not found
 *       500:
 *         description: error bad request
 */
router.get("/",authMiddleware.userAuthentication,authMiddleware.checkRole(1),profileController.GetProfileController)

/**
 * @swagger
 * /owner/profile:
 *   patch:
 *     summary: Updating a owner profile information data
 *     tags: [Profile - Owner]
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
router.patch("/",authMiddleware.userAuthentication,authMiddleware.checkRole(1),profileController.UpdateProfileController)

module.exports = router