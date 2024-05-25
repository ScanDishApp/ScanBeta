import express from "express";
import Book from "../dom/book.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const BOOK_API = express.Router();
BOOK_API.use(express.json());

/**
 * @swagger
 * /book/get:
 *   get:
 *     summary: Retrieve a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 contents:
 *                   type: string
 *                 userId:
 *                   type: string
 *       401:
 *         description: Invalid book credentials
 *       500:
 *         description: Internal server error
 * 
 * /book/list:
 *   get:
 *     summary: Retrieve books by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve books from
 *     responses:
 *       200:
 *         description: List of books found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   contents:
 *                     type: string
 *                   userId:
 *                     type: string
 *       401:
 *         description: Invalid book credentials
 *       500:
 *         description: Internal server error
 * 
 * /book/listShared:
 *   get:
 *     summary: Retrieve books by multiple user IDs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The IDs of the users to retrieve books from
 *     responses:
 *       200:
 *         description: List of books found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   contents:
 *                     type: string
 *                   userId:
 *                     type: string
 *       401:
 *         description: Invalid book credentials
 *       500:
 *         description: Internal server error
 * 
 * /book/:
 *   post:
 *     summary: Creates a new book
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
 *               title:
 *                 type: string
 *               contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 contents:
 *                   type: string
 *                 userId:
 *                   type: string
 *       401:
 *         description: Something went wrong
 *       500:
 *         description: Missing data fields
 * 
 * /book/{id}:
 *   put:
 *     summary: Updates a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 contents:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Bad request
 * 
 * /book/delete:
 *   delete:
 *     summary: Deletes a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       500:
 *         description: Internal server error
 */


BOOK_API.get('/get', async (req, res, next) => {
  const { id } = req.query;
  try {
    const book = new Book();
    book.id = id;

    const bookResult = await book.getBook();

    if (bookResult.success) {
      const cookbook = bookResult.dbBook;
      res.status(HttpCodes.SuccesfullRespons.Ok).json(cookbook).end();
    } else {
      console.error("Cannot find book:", bookResult.message);
      if (bookResult.error) {
        console.error("Detailed error:", bookResult.error);
      }
      res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid book credentials");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
  }
});

BOOK_API.get('/list', async (req, res, next) => {
  const { userId } = req.query;
  try {
    const book = new Book();
    book.userId = userId;

    const bookResult = await book.listBook();

    if (bookResult.success) {
      let dbBook = bookResult.dbBook;
      res.status(HttpCodes.SuccesfullRespons.Ok).json(dbBook).end();
    } else {
      console.error("Cannot find book:", bookResult.message);
      if (bookResult.error) {
        console.error("Detailed error:", bookResult.error);
      }
      res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid book credentials");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
  }
});

BOOK_API.get('/listShared', async (req, res, next) => {
  const { userId } = req.query;
  try {
    const book = new Book();
    book.userId = userId;

    const bookResult = await book.listSharedBook();

    if (bookResult.success) {
      let dbBook = bookResult.dbBook;
      res.status(HttpCodes.SuccesfullRespons.Ok).json(dbBook).end();
    } else {
      console.error("Login failed:", bookResult.message);
      if (bookResult.error) {
        console.error("Detailed error:", bookResult.error);
      }
      res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid book credentials");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
  }
});

BOOK_API.post('/', async (req, res, next) => {
  const { userId, contents, title } = req.body;

  if (userId != "") {
    let book = new Book();
    book.userId = userId;
    book.contents = contents;
    book.title = title;
    try {
      book = await book.save();
      res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(book)).end();
    } catch {
      res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Something went wrong").end();
    }
  } else {
    res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Missing data fields").end();
  }
});

BOOK_API.put('/:id', async (req, res) => {
  const { id, userId, contents } = req.body;

  let dbBook = new Book();

  dbBook.id = id;
  dbBook.userId = userId;
  dbBook.contents = contents;

  if (dbBook) {
    dbBook = await dbBook.save();
    res.status(HttpCodes.SuccesfullRespons.Ok).json(dbBook).end();
  } else {
    res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
  }
});

BOOK_API.delete('/delete', async (req, res) => {
  const { id } = req.query;
  const book = new Book();
  book.id = id;
  console.log("delete book");

  try {
    await book.delete();
    res.status(HttpCodes.SuccesfullRespons.Ok).send("Book was successfully deleted");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
  }
});

export default BOOK_API;
