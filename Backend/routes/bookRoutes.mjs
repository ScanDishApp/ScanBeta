import express from "express";
import Book from "../modules/book.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";
import { logDOM } from "@testing-library/react";

const BOOK_API = express.Router();
BOOK_API.use(express.json());


BOOK_API.get('/get', async (req, res, next) => {
    const { id }  = req.query;
     try {
        const book = new Book();
        book.id = id;
  
        const bookResult = await book.getBook();

        if (bookResult.success) {
            const cookbook = bookResult.dbBook;
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

BOOK_API.get('/list', async (req, res, next) => {
    const { userId }  = req.query;
     try {
        const book = new Book();
        book.userId = userId;
  
        const bookResult = await book.listBook();

        if (bookResult.success) {
            let dbBook = bookResult.dbBook
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
BOOK_API.get('/listShared', async (req, res, next) => {
    const { userId }  = req.query;
     try {
        const book = new Book();
        book.userId = userId;
  
        const bookResult = await book.listSharedBook();

        if (bookResult.success) {
            let dbBook = bookResult.dbBook
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

    const { userId , contents } = req.body;

    if (userId != "") {
        let book = new Book();
        book.userId = userId;
        book.contents = contents;

     try{
            book = await book.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(book)).end();
        }catch{
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Noe gikk galt ").end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

BOOK_API.put('/:id', async (req, res) => {
    const {id, userId, contents} = req.body;
  
    let dbBook = new Book(); 
   
    dbBook.id = id
    dbBook.userId = userId;
    dbBook.contents = contents;
  

    let exists = false;

    if (!exists) {

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
    console.log("delete book")

    try {
        await book.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default BOOK_API
