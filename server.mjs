import 'dotenv/config';
import express from 'express';
import path from 'path';
import USER_API from './Backend/routes/userRoutes.mjs';
import BOOK_API from './Backend/routes/bookRoutes.mjs';
import FRIEND_API from './Backend/routes/friendRoutes.mjs';
import errorHandler from './Backend/modules/errorHandler.mjs';
import cors from 'cors';

const server = express();
server.use(cors());

// Set the port number from the environment variable or default to 8080
const port = process.env.PORT || 8080;
server.set('port', port);

// Serve static files from the 'build' directory
server.use(express.static('build'));

// Define your API routes
server.use("/user", USER_API);
server.use("/book", BOOK_API);
server.use("/friends", FRIEND_API);

// Define a route for the root URL
server.get("/", (req, res, next) => {
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();
});

// Error handler middleware
server.use(errorHandler);

// Start the server
server.listen(server.get('port'), function () {
    console.log('Server running on port', server.get('port'));
});
