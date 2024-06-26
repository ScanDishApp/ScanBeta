import 'dotenv/config';
import express from 'express';
import path from 'path';
import BOOK_API from './backend/routes/bookRoutes.mjs'
import FRIEND_API from './backend/routes/friendRoutes.mjs';
import FAVORITE_API from './backend/routes/favoriteRoutes.mjs';
import PAGE_API from './backend/routes/pageRoutes.mjs';
import USER_API from './backend/routes/userRoutes.mjs'
import errorHandler from './backend/modules/errorHandler.mjs';
import cors from 'cors';
import { swaggerUi, swaggerSpec } from './swagger.mjs'

const server = express();
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(cors());

const port = (process.env.PORT || 8080);
server.set('port', port);

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

server.use(express.static('build'));
server.use("/book", BOOK_API);
server.use("/user", USER_API);
server.use("/friends", FRIEND_API);
server.use("/favorite", FAVORITE_API); 
server.use("/page", PAGE_API);

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('Server running on port', server.get('port'));
});

