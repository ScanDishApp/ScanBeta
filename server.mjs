import 'dotenv/config';
import express from 'express';



import USER_API from './Backend/routes/userRoutes.mjs';
import BOOK_API from './Backend/routes/bookRoutes.mjs';
import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';

import FRIEND_API from './Backend/routes/friendRoutes.mjs';



import path from 'path';


const server = express();


server.use(cors());

const port = process.env.PORT || 8080;
server.set('port', port);


server.use("/user", USER_API); 
server.use("/book", BOOK_API );

// Middleware to handle root path ("/")



// Serve static files from the 'public' directory
server.use(express.static('src'));

server.use("/user", USER_API);
server.use("/book", BOOK_API);

server.get("/", (req, res, next) => {
   req.originalUrl;
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();
});

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
