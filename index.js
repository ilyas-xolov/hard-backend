import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import postRouter from "./router/post.route.js";
import color from "colors"; 
import fileUpload from "express-fileupload";

dotenv.config();

const server = express();

server.use(express.json());
server.use(fileUpload)

server.use('/api/post',postRouter);


// -------------------- CONNECTING -------------------- 
const Connection = async ()=> {
    try {
        server.listen(process.env.PORT, async () => console.log(`Listening on http://localhost:${process.env.PORT}`));
        try {
            await mongoose.connect(process.env.MONGO_URL).then(console.log('Connection success with MongoDb'));
        } catch (error) {console.log(color.red('Connection error with MongoDb: ') + error)}
        
    } catch (error){console.log(color.red('Syntax Error: ') + error)}
}

Connection();
