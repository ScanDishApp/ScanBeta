import 'dotenv/config';
import express from 'express';
import path from 'path'; // Import path module
import USER_API from './Backend/routes/userRoutes.mjs';
import BOOK_API from './Backend/routes/bookRoutes.mjs';

import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';



import FRIEND_API from './Backend/routes/friendRoutes.mjs';
import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';


const server = express();
server.use(cors());

const port = process.env.PORT || 8080;
server.set('port', port);



server.use("/user", USER_API); 
server.use("/book", BOOK_API );

// Middleware to handle root path ("/")

// Serve static files from the 'src/screens' directory
server.use(express.static('screens'));

server.use("/user", USER_API);
server.use("/book", BOOK_API);
server.use("/friends", FRIEND_API)


server.get("/", (req, res, next) => {
   console.log('Requested URL:', req.originalUrl);
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();
});

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
