import express from "express";
import Favorites from "../dom/favorites.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";


const FAVORITE_API = express.Router();
FAVORITE_API.use(express.json());

FAVORITE_API.get('/get', async (req, res, next) => {
    const { userId } = req.query
    console.log(userId);
    try {
        const like = new Favorites();
        like.userId = userId;
        const getLikeResult = await like.list();

        if (getLikeResult) {
            res.status(HttpCodes.SuccesfullRespons.Ok).json(getLikeResult).end();
        } else {
            console.error("Favorite Failed:");
            if (getLikeResult.error) {
                console.error("Detailed error:");
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
})

FAVORITE_API.post('/', async (req, res, next) => {

    const { userId, contents } = req.body;

    if (userId != "" && contents != "") {
        let like = new Favorites();
        like.userId = userId;
        like.contents = contents;
        try {
            like = await like.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(like)).end();
        } catch {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
        }
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

FAVORITE_API.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const like = new Favorites();
    like.id = id;

    try {
        await like.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default FAVORITE_API
