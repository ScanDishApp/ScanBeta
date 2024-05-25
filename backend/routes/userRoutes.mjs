import express from "express";
import User from "../dom/user.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const USER_API = express.Router();
USER_API.use(express.json());
/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Retrieve a user by id 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve 
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 img:
 *                   type: string
 *       401:
 *         description: Could not find user
 *       500:
 *         description: Internal server error
 * 
 * /user/:
 *   post:
 *     summary: Creates a new User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               pswHash:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 img:
 *                   type: string
 *       400:
 *         description: Missing data fields or email already exists
 *       500:
 *         description: Internal server error 
 * 
 * /user/login:
 *   post:
 *     summary: Log in user 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pswHash:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 img:
 *                   type: string
 *       400:
 *         description: Missing data fields
 *       401:
 *         description: Invalid login credentials
 *       500:
 *         description: Internal server error
 * 
 * /user/{id}:
 *   put:
 *     summary: Updates a User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               pswHash:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 img:
 *                   type: string
 *       400:
 *         description: Missing data fields or email already exists
 *       500:
 *         description: Internal server error
 * 
 * /user/delete:
 *   delete:
 *     summary: Deletes a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */


USER_API.get('/get', async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = new User();
        user.id = id;
        const getUserResult = await user.getUser();

        if (getUserResult.success) {
            const userInfo = getUserResult.user;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(userInfo);
        } else {
            console.error("Getting user Failed:", getUserResult.message);
            if (getUserResult.error) {
                console.error("Detailed error:", getUserResult.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Cound not find user");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});


USER_API.post('/login', async (req, res, next) => {
    try {
        const { email, pswHash } = req.body;

        if (!email || !pswHash) {
            return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields");
        }

        const user = new User();
        user.email = email;
        user.pswHash = pswHash;
        const loginResult = await user.login();

        if (loginResult.success) {
            const userInfo = loginResult.user;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(userInfo);
        } else {
            console.error("Login failed:", loginResult.message);
            if (loginResult.error) {
                console.error("Detailed error:", loginResult.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid login credentials");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});


USER_API.post('/', async (req, res, next) => {
    try {
        const { name, email, pswHash, img } = req.body;
        console.log(name+ email+pswHash + img );
        if (!name || !email || !pswHash) {
            return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields");
        }

        let user = new User
        user.name = name;
        user.email = email;
        user.pswHash = pswHash;
        user.img = img;
        user = await user.save();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(user);
    } catch (error) {
        console.error("Unexpected error:", error);  
        if (error.code === '54000' && error.constraint === 'Users_email_key') {
            return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Email already exists");
        }
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});


USER_API.put('/:id', async (req, res) => {
    try {
        const { name, email, pswHash, img, id } = req.body;
        let user = new User();
        user.name = name;
        user.email = email;
        user.pswHash = pswHash;
        user.id = id;
        user.img = img
        user = await user.save();

        res.status(HttpCodes.SuccesfullRespons.Ok).json(user);
    } catch (error) {
        console.error("Unexpected error:", error);
        if (error.code === '23505' && error.constraint === 'Users_email_key')  {
            return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Email already exists, cannot change to this email");
        }
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});


USER_API.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = new User();
        user.id = id;
        await user.delete();

        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default USER_API;
