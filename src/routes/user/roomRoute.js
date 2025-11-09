const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const roomController = require('../../controllers/roomController')

/**
 * @swagger
 * tags:
 *   name: Rooms - User
 *   description: API for CRUD rooms (for user role)
 */

/**
 * @swagger
 * /user/rooms:
 *   get:
 *     summary: Show rooms list data
 *     tags: [Rooms - User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list rooms are succesfully appeared
 *       500:
 *         description: Error bad request
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(0), roomController.GetAllRoomsController)

/**
 * @swagger
 * /user/rooms/{roomCode}:
 *   get:
 *     summary: Show room detail information data
 *     tags: [Rooms - User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roomCode
 *         in: path
 *         required: true
 *         description: room code parameter
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A room detail information data are succesfully appeared
 *       400:
 *         description: A room detail information data are not found
 *       500:
 *         description: Error bad request
 */
router.get("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(0), roomController.GetOneRoomController)

module.exports = router