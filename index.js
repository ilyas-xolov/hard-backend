import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import color from "colors"; 
import fileUpload from "express-fileupload";
import requestTime from "./middleware/request-time.js";

// ------------------ ROUTES --------------------- //
import postRouter from "./router/post.route.js";
import authRouter from "./router/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const server = express();
server.use(requestTime);
server.use(cookieParser({}))
server.use(express.json());
server.use(express.static("static"))
server.use(fileUpload({}));

server.use('/api/post',postRouter);
server.use('/api/auth',authRouter);


const Connection = async ()=> { // CONNECTING ...
    try {
        server.listen(process.env.PORT, async () => console.log(`Listening on http://localhost:${process.env.PORT}`));
        try {
            await mongoose.connect(process.env.MONGO_URL).then(console.log('Connection success with MongoDb'));
        } catch (error) {console.log(color.red('Connection error with MongoDb: ') + error)}
        
    } catch (error){console.log(color.red('Syntax Error: ') + error)}
}

Connection();
