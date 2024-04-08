import 'dotenv/config' ;
import express from 'express'; 
import USER_API from './Backend/routes/userRoutes.mjs'; 
import BOOK_API from './Backend/routes/bookRoutes.mjs'
import errorHandler from './Backend/modules/errorHandler.mjs';

const server = express();

const port = (process.env.PORT || 3000);
server.set('port', port);


server.use(express.static('public'));

server.use("/user", USER_API); 

server.use("/book", BOOK_API );



server.get("/", (req, res, next) => {
   req.originalUrl
   res.status(200).send(JSON.stringify({ msg: "Hello there" })).end();

});

server.use(errorHandler);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


