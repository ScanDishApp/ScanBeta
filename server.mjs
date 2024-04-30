import 'dotenv/config';
import express from 'express';
import path from 'path';
import USER_API from './backend/routes/userRoutes.mjs';
import FAVORITE_API from "./backend/routes/favoriteRoutes.mjs"
import BOOK_API from './backend/routes/bookRoutes.mjs';
import FRIEND_API from './backend/routes/friendRoutes.mjs';
import errorHandler from './backend/modules/errorHandler.mjs';
import cors from 'cors';

const server = express();
server.use(cors());

const port = process.env.PORT || 8080;
server.set('port', port);

server.use(express.static('build'));

server.use("/user", USER_API);
server.use("/book", BOOK_API);
server.use("/friends", FRIEND_API);
server.use("/favorite", FAVORITE_API);

server.get("/", (req, res, next) => {
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();
});

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('Server running on port', server.get('port'));
});
