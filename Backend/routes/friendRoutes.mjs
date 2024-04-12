import express from "express";
import Friends from "../modules/friend.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const FRIEND_API = express.Router();
FRIEND_API.use(express.json());


FRIEND_API.post('/add', async (req, res, next) => {
    const { userId, friendId, status } = req.body;

    try {
        const friend = new Friends();
        friend.userId = userId;
        friend.friendId = friendId;
        friend.status = status;
        const friendRequest = await friend.save();

        if (friendRequest.success) {
            const status = friendRequest.status;
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

FRIEND_API.post('/accept', async (req, res, next) => {

    const { userId, friendId, status } = req.body;

    try {
        const friend = new Friends();
        friend.userId = userId;
        friend.friendId = friendId;
        friend.status = status;
        const friendRequest = await friend.save();

        if (friendRequest.success) {
            const status = friendRequest.status;
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

FRIEND_API.post('/remove', async (req, res) => {
    const { userId, friendId, status } = req.body;

    try {
        const friend = new Friends();
        friend.userId = userId;
        friend.friendId = friendId;
        friend.status = status;
        const friendRequest = await friend.save();

        if (friendRequest.success) {
            const status = friendRequest.status;
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

FRIEND_API.get('/list', async (req, res) => {
    const { userId } = req.params;
    try {
    const friend = new Friends();
    friend.userId = userId;
    const friendRequest = await friend.list();

    if (friendRequest.success) {
        const status = friendRequest.status;
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
