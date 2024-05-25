import express from "express";
import Page from '../dom/page.mjs'
import { HttpCodes } from "../modules/httpCodes.mjs";


const PAGE_API = express.Router();
PAGE_API.use(express.json());

/**
 * @swagger
 * /page/get:
 *   get:
 *     summary: Retrieve pages by book ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to retrieve pages from
 *     responses:
 *       200:
 *         description: Pages found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookId:
 *                   type: string
 *                 pages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       imageFile:
 *                         type: string
 *                       desc:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       selectedColor:
 *                         type: string
 *                       selectedFont:
 *                         type: string
 *       401:
 *         description: Invalid book credentials
 *       500:
 *         description: Internal server error
 * 
 * /page/:
 *   post:
 *     summary: Creates a new page
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               imageFile:
 *                 type: string
 *               desc:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               selectedColor:
 *                 type: string
 *               selectedFont:
 *                 type: string
 *     responses:
 *       200:
 *         description: Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 bookId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 ingredients:
 *                   type: string
 *                 imageFile:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 selectedColor:
 *                   type: string
 *                 selectedFont:
 *                   type: string
 *       400:
 *         description: Something went wrong
 *       500:
 *         description: Internal server error
 * 
 * /page/{id}:
 *   put:
 *     summary: Updates a page
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the page to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               imageFile:
 *                 type: string
 *               desc:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               selectedColor:
 *                 type: string
 *               selectedFont:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 ingredients:
 *                   type: string
 *                 imageFile:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 selectedColor:
 *                   type: string
 *                 selectedFont:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 * /page/delete:
 *   delete:
 *     summary: Deletes pages by book ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to delete pages from
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *       500:
 *         description: Internal server error
 */

PAGE_API.get('/get', async (req, res, next) => {
    const { bookId } = req.query;
    try {
        const page = new Page();
        page.bookId = bookId;

        const pageResult = await page.getPages();

        if (pageResult.success) {
            const page = pageResult.dbPage;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(page).end();
        } else {
            console.error("Page failed:", pageResult.message);
            if (pageResult.error) {
                console.error("Detailed error:", pageResult.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid book credentials");
        }
    } catch (error) {

        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

PAGE_API.post('/', async (req, res, next) => {

    const { bookId, title, ingridens, imageFile, desc, images, selectedColor, selectedFont } = req.body;

    if (bookId != "") {
        let page = new Page();
        page.bookId = bookId;
        page.title = title;
        page.ingridens = ingridens;
        page.imageFile = imageFile;
        page.desc = desc;
        page.images = images;
        page.selectedColor = selectedColor;
        page.selectedFont = selectedFont;
        try {
            page = await page.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(page)).end();
        } catch {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Something went wrong ").end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

PAGE_API.put('/:id', async (req, res) => {
    const { title, ingridens, imageFile, desc, images, selectedColor, selectedFont, id } = req.body;

    let dbPage = new Page();
    dbPage.id = id
    dbPage.title = title;
    dbPage.ingridens = ingridens;
    dbPage.imageFile = imageFile;
    dbPage.desc = desc;
    dbPage.images = images;
    dbPage.selectedColor = selectedColor;
    dbPage.selectedFont = selectedFont;
    if (dbPage.id) {

        dbPage = await dbPage.save();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(dbPage).end();
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
    }

});

PAGE_API.delete('/delete', async (req, res) => {
    const { bookId } = req.query;
    const page = new Page();
    page.bookId = bookId;
    try {
        await page.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default PAGE_API 
