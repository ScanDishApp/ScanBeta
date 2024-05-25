import express from "express";
import Friends from "../dom/friend.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const FRIEND_API = express.Router();
FRIEND_API.use(express.json());

/**
 * @swagger
 * /friends/get:
 *   get:
 *     summary: Retrieve a user's friends 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a user to retrieve friends for 
 *     responses:
 *       200:
 *         description: Friends retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: string
 *                       friendId:
 *                         type: string
 *                       status:
 *                         type: string
 *                       name:
 *                         type: string
 *       401:
 *         description: Couldn't find friends
 *       500:
 *         description: Internal server error
 * 
 * /friends/requests:
 *   get:
 *     summary: Retrieve requests sent to a user ID 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve friend requests for
 *     responses:
 *       200:
 *         description: Friend requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 friendRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: string
 *                       friendId:
 *                         type: string
 *                       status:
 *                         type: string
 *                       name:
 *                         type: string
 *       401:
 *         description: Couldn't find requests
 *       500:
 *         description: Internal server error
 * 
 * /friends/add:
 *   post:
 *     summary: Add a new friend
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               friendId:
 *                 type: string
 *               status:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 friendId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Invalid friend credentials
 *       500:
 *         description: Internal server error
 * 
 * /friends/ans:
 *   put:
 *     summary: Respond to friend request 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Friend request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 id:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 * /friends/remove:
 *   put:
 *     summary: Remove a friend 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Friend removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 id:
 *                   type: integer
 *       400:
 *         description: Failed to save friend request
 *       500:
 *         description: Internal server error
 */

FRIEND_API.post('/add', async (req, res, next) => {
    const { userId, friendId, status, name } = req.body;

    try {
        const friend = new Friends();
        friend.userId = userId;
        friend.friendId = friendId;
        friend.status = status;
        friend.name = name;
        const friendRequest = await friend.save();

        if (friendRequest) {
            const status = friendRequest;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
        } else {
            console.error("Adding friends failed:", friendRequest.message);
            if (friendRequest.error) {
                console.error("Detailed error:", friendRequest.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid friend credentials");
        }
    } catch (error) {

        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

FRIEND_API.put('/ans', async (req, res, next) => {
    const { status, id } = req.body;

    try {
        const friend = new Friends();
        friend.status = status;
        friend.id = id;
        const friendRequest = await friend.save();

        if (friendRequest) {
            const status = friendRequest;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
        } else {
            console.error("Failed to save friend request");
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Failed to save friend request");
        }
    } catch (error) {
        console.error("Error while processing request:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

FRIEND_API.put('/remove', async (req, res) => {
    const { status, id } = req.body;

    try {
        const friend = new Friends();
        friend.status = status;
        friend.id = id;
        const friendRequest = await friend.save();

        if (friendRequest) {
            const status = friendRequest;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
        } else {
            console.error("Failed to save friend request");
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Failed to save friend request");
        }
    } catch (error) {
        console.error("Error while processing request:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }

});

FRIEND_API.get('/requests', async (req, res) => {
    const { userId } = req.query;
    try {
        const friend = new Friends();
        friend.userId = userId;
        const friendRequest = await friend.listRequest();

        if (friendRequest.success) {
            const status = friendRequest.dbFriend;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
        } else {
            console.error("Getting requeste failed:", friendRequest.message);
            if (friendRequest.error) {
                console.error("Detailed error:", friendRequest.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Couldnt find request ");
        }
    } catch (error) {

        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }

});

FRIEND_API.get('/get', async (req, res) => {
    const { userId } = req.query;
    try {
        const friend = new Friends();
        friend.userId = userId;
        const friendRequest = await friend.list();

        if (friendRequest.success) {
            const status = friendRequest.dbFriend;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
        } else {
            console.error("Getting friends failed:", friendRequest.message);
            if (friendRequest.error) {
                console.error("Detailed error:", friendRequest.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Couldnt find friends");
        }
    } catch (error) {

        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }

});

export default FRIEND_API
