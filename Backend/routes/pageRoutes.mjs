import express from "express";
import Page from '../dom/page.mjs'
import { HttpCodes } from "../modules/httpCodes.mjs";


const PAGE_API = express.Router();
PAGE_API.use(express.json());


PAGE_API.get('/get', async (req, res, next) => {
    const { id }  = req.query;
     try {
        const page = new Page();
        page.id = id;
  
        const pageResult = await page.getPages();

        if (pageResult.success) {
            const page = pageResult.dbPage;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(page).end();
        } else {
            console.error("Login failed:", pageResult.message);
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

    const { bookId , title, ingridens, imageFile, desc, images, selectedColor,selectedFont} = req.body;

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
     try{
        page = await page.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(page)).end();
        }catch{
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Noe gikk galt ").end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

PAGE_API.put('/:id', async (req, res) => {
    const {title, ingridens, imageFile, desc, images, selectedColor,selectedFont} = req.body;
    const {id } = req.params
  
    let dbPage = new Page(); 
   
    dbPage.id = id
    dbPage.title = title;
    dbPage.ingridens = ingridens;
    dbPage.imageFile = imageFile;
    dbPage.desc = desc;
    dbPage.images = images;
    dbPage.selectedColor = selectedColor;
    dbPage.selectedFont = selectedFont;
    console.log(req.body);
    if (dbPage.id) {

        dbPage = await dbPage.save();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(dbPage).end();
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
    }

});

PAGE_API.delete('/delete', async (req, res) => {
    const { id } = req.query;
    const page = new Page();
    page.id = id;
    console.log("delete page")

    try {
        await page.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User was successfully deleted");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

export default PAGE_API 
