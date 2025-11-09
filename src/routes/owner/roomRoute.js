const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')
const roomController = require('../../controllers/roomController')

/**
 * @swagger
 * tags:
 *   name: Rooms - Owner
 *   description: API for CRUD rooms (for owner role)
 */

/**
 * @swagger
 * /owner/rooms:
 *   get:
 *     summary: Show rooms list data by owner
 *     tags: [Rooms - Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list rooms are succesfully appeared
 *       500:
 *         description: Error bad request
 */
router.get("/", authMiddleware.userAuthentication, authMiddleware.checkRole(1), roomController.GetAllRoomsByOwnerController)

/**
 * @swagger
 * /owner/rooms/{roomCode}:
 *   get:
 *     summary: Show owner room detail information data
 *     tags: [Rooms - Owner]
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
router.get("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(1), roomController.GetOneRoomController)

/**
 * @swagger
 * /owner/rooms:
 *   post:
 *     summary: Creating a new room
 *     tags: [Rooms - Owner]
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
router.post("/", authMiddleware.userAuthentication, authMiddleware.checkRole(1), roomController.CreateRoomController)

/**
 * @swagger
 * /owner/rooms/{roomCode}:
 *   patch:
 *     summary: Update a existing room data
 *     tags: [Rooms - Owner]
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
router.patch("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(1), roomController.UpdateRoomController)

/**
 * @swagger
 * /owner/rooms/{roomCode}:
 *   delete:
 *     summary: Delete room detail data
 *     tags: [Rooms - Owner]
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
router.delete("/:roomCode", authMiddleware.userAuthentication, authMiddleware.checkRole(1), roomController.DeleteRoomController)

module.exports = router