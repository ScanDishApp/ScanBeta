import express from "express";
import Friends from "../dom/friend.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const FRIEND_API = express.Router();
FRIEND_API.use(express.json());

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
            console.error("Login failed:", friendRequest.message);
            if (friendRequest.error) {
                console.error("Detailed error:", friendRequest.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid login credentials");
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
    console.log(userId);
    try {
    const friend = new Friends();
    friend.userId = userId;
    const friendRequest = await friend.listRequest();

    if (friendRequest.success) {
        const status = friendRequest.dbFriend;
        res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
    } else {
        console.error("Login failed:", friendRequest.message);
        if (friendRequest.error) {
            console.error("Detailed error:", friendRequest.error);
        }
        res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid login credentials");
    }
} catch (error) {

    console.error("Unexpected error:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
}

});

FRIEND_API.get('/get', async (req, res) => {
    const { userId } = req.query;
    console.log(userId);
    try {
    const friend = new Friends();
    friend.userId = userId;
    const friendRequest = await friend.list();

    if (friendRequest.success) {
        const status = friendRequest.dbFriend;
        res.status(HttpCodes.SuccesfullRespons.Ok).json(status).end();
    } else {
        console.error("Login failed:", friendRequest.message);
        if (friendRequest.error) {
            console.error("Detailed error:", friendRequest.error);
        }
        res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid login credentials");
    }
} catch (error) {

    console.error("Unexpected error:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
}

});

export default FRIEND_API
