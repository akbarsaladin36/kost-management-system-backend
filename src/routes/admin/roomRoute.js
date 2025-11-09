const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const roomController = require('../../controllers/roomController')

/**
 * @swagger
 * tags:
 *   name: Rooms - Admin
 *   description: API for CRUD rooms (for admin role)
 */

/**
 * @swagger
 * /admin/rooms:
 *   get:
 *     summary: Show rooms list data
 *     tags: [Rooms - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list rooms are succesfully appeared
 *       500:
 *         description: Error bad request
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(2), roomController.GetAllRoomsController)

/**
 * @swagger
 * /admin/rooms/{roomCode}:
 *   get:
 *     summary: Show rooms detail information data
 *     tags: [Rooms - Admin]
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
 *         description: A rooms detail information data are succesfully appeared
 *       400:
 *         description: A rooms detail information data are not found
 *       500:
 *         description: Error bad request
 */
router.get("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), roomController.GetOneRoomController)

/**
 * @swagger
 * /admin/rooms:
 *   post:
 *     summary: Creating a new room
 *     tags: [Rooms - Admin]
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
 *               roomName:
 *                 type: string
 *               roomType:
 *                 type: string
 *               roomDesc:
 *                 type: string
 *               roomPrice:
 *                 type: integer
 *               roomQuantity:
 *                 type: integer
 *               roomStatus:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A new room are succesfully created
 *       400:
 *         description: A room data are registered
 *       500:
 *         description: Error bad request
 */
router.post("/", authMiddleware.userAuthentication, authMiddleware.checkRole(2), roomController.CreateRoomController)

/**
 * @swagger
 * /admin/rooms/{roomCode}:
 *   patch:
 *     summary: Update a existing room data
 *     tags: [Rooms - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roomCode
 *         in: path
 *         required: true
 *         description: room code parameter
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *               roomType:
 *                 type: string
 *               roomDesc:
 *                 type: string
 *               roomPrice:
 *                 type: integer
 *               roomQuantity:
 *                 type: integer
 *               roomStatus:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A new room are succesfully updated
 *       400:
 *         description: A room data are not found
 *       500:
 *         description: Error bad request
 */
router.patch("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), roomController.UpdateRoomController)

/**
 * @swagger
 * /admin/rooms/{roomCode}:
 *   delete:
 *     summary: Delete room detail data
 *     tags: [Rooms - Admin]
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
 *         description: A rooms detail information data are succesfully deleted
 *       400:
 *         description: A rooms detail information data are not found
 *       500:
 *         description: Error bad request
 */
router.delete("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(2), roomController.DeleteRoomController)

module.exports = router