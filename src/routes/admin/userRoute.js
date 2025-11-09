const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authMiddleware = require('../../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Users - Admin
 *   description: API for CRUD users (for admin role)
 */


/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Show users list
 *     tags: [Users - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succesfully show all users list
 *       400:
 *         description: All users data are empty
 */
router.get("/",authMiddleware.userAuthentication,authMiddleware.checkRole(2),userController.GetUsersController)

/**
 * @swagger
 * /admin/users/{username}:
 *   get:
 *     summary: Show user detail information
 *     tags: [Users - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username parameter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully show detail user information
 *       400:
 *         description: detail user not found
 */
router.get("/:username",authMiddleware.userAuthentication,authMiddleware.checkRole(2),userController.GetUserController)

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Creating a new user
 *     tags: [Users - Admin]
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
 *               role:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A new user are succesfully created
 *       400:
 *         description: A user are registered
 *       500:
 *         description: Error bad request
 */
router.post("/",authMiddleware.userAuthentication,authMiddleware.checkRole(2),userController.CreateUserController)

/**
 * @swagger
 * /admin/users/{username}:
 *   patch:
 *     summary: Updating an existing user data
 *     tags: [Users - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username parameter
 *         schema:
 *           type: string
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
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: An existing user data are updated
 *       400:
 *         description: A user are not found
 *       500:
 *         description: Error bad request
 */
router.patch("/:username",authMiddleware.userAuthentication,authMiddleware.checkRole(2),userController.UpdateUserController)

/**
 * @swagger
 * /admin/users/{username}:
 *   delete:
 *     summary: Delete user data
 *     tags: [Users - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username parameter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully delete a user data
 *       400:
 *         description: detail user not found
 *       500:
 *         description: Error bad request
 */
router.delete("/:username",authMiddleware.userAuthentication,authMiddleware.checkRole(2),userController.DeleteUserController)


module.exports = router