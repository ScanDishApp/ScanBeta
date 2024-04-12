import 'dotenv/config';
import express from 'express';
<<<<<<< HEAD

=======
>>>>>>> 0cbb5b5db98d44067ca1265a466aff66ca92fbec
import USER_API from './Backend/routes/userRoutes.mjs';
import BOOK_API from './Backend/routes/bookRoutes.mjs';
import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';
<<<<<<< HEAD
import FRIEND_API from './Backend/routes/friendRoutes.mjs';


=======
import path from 'path';
>>>>>>> 0cbb5b5db98d44067ca1265a466aff66ca92fbec

const server = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

server.use(cors());

const port = process.env.PORT || 8080;
server.set('port', port);

<<<<<<< HEAD
server.use("/user", USER_API); 
server.use("/book", BOOK_API );

// Middleware to handle root path ("/")

=======
>>>>>>> 0cbb5b5db98d44067ca1265a466aff66ca92fbec
// Serve static files from the 'src/screens' directory
server.use(express.static(path.join(__dirname, 'src', 'screens')));

// Serve static files from the 'public' directory
server.use(express.static(path.join(__dirname, 'public')));

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
