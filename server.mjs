import 'dotenv/config';
import express from 'express';
import path from 'path'; // Import path module
import USER_API from './Backend/routes/userRoutes.mjs';
import BOOK_API from './Backend/routes/bookRoutes.mjs';
import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';

const __dirname = path.dirname(new URL(import.meta.url).pathname); // Define __dirname for ES module scope

const server = express();
server.use(cors());

const port = (process.env.PORT || 8080);
server.set('port', port);

// Serve static files from 'src/screens' directory and 'public' directory
server.use(express.static(path.join(__dirname, 'src', 'screens')));
server.use(express.static(path.join(__dirname, 'public')));

server.use("/user", USER_API); 
server.use("/book", BOOK_API );

// Middleware to handle root path ("/")
server.get("/", (req, res, next) => {
   console.log('Requested URL:', req.originalUrl);
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();
});

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
