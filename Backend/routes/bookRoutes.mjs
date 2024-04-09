import express from "express";
import Book from "../modules/book.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const BOOK_API = express.Router();
BOOK_API.use(express.json());


BOOK_API.get('/get', async (req, res, next) => {
    const  id  = req.query.id;
   

    if (!id) {
        return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Bok finnes ikke").end();
    }
    

    try {
        const book = new Book();
        book.id = id;
  
        const bookResult = await book.getBook();

        if (bookResult.success) {
            const cookbook = bookResult.book;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(cookbook).end();
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

    const { userId , contents } = req.body;

    if (userId != "" && contents != "") {
        let book = new Book();
        book.userId = userId;
        book.contents = contents;

        let exists = false;

        if (!exists) {
            book = await book.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(book)).end();
        } else {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

BOOK_API.put('/:id', async (req, res) => {
    const { userId, contents, id } = req.body;
    let book = new Book(); 
    
    
    book.userId = userId;
    book.contents = contents;
    book.id = id

    let exists = false;

    if (!exists) {

        book = await user.book();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(book)).end();
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
    }

});

BOOK_API.delete('/delete', async (req, res) => {
    const { id } = req.query;
    const book = new Book();
    book.id = id;
    console.log("delete book")

    try {
        await book.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

// BOOK_API.get('/', async (req, res) => {
//     console.log("get book");
//     res.status(HttpCodes.SuccesfullRespons.Ok).send("Get bok ok!");
// });


export default BOOK_API
