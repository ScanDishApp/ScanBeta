import express from "express";
import Favorites from "../dom/favorites.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";


const FAVORITE_API = express.Router();
FAVORITE_API.use(express.json());
/**
 * @swagger
 * /favorite/get:
 *   get:
 *     summary: Retrieve a favorite by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve favorites from. 
 *     responses:
 *       200:
 *         description: Favorite found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 contents:
 *                   type: string
 *       401:
 *         description: Invalid favorite credentials
 *       500:
 *         description: Internal server error
 * 
 * /favorite/getOffline:
 *   get:
 *     summary: Retrieve favorite by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the favorite to retive 
 *     responses:
 *       200:
 *         description: Favorite found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: string
 *                 contents:
 *                   type: string
 *       401:
 *         description: Invalid favorite credentials
 *       500:
 *         description: Internal server error
 * /favorite/:
 *   post:
 *     summary: Creates a new favorite
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
 *               contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorites created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 contents:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Missing data fields
 * /favorite/delete:
 *   delete:
 *     summary: Deletes a favorites by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the favorite to delete
 *     responses:
 *       200:
 *         description: Favorite deleted successfully
 *       500:
 *         description: Internal server error
 */

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
FAVORITE_API.get('/getOffline', async (req, res, next) => {
    const { id } = req.query

    try {
        const like = new Favorites();
        like.id = id;
        const getLikeResult = await like.listOffline();

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
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields").end();
    }

});

FAVORITE_API.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const like = new Favorites();
        like.id = id;
        await like.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("Favorite deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default FAVORITE_API
