import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postModel from "./models/post.model.js";

dotenv.config();
const server = express();

server.use(express.json());





// -------------------- REQUEST -------------------- 
server.get('/',async ( req, res )=> {
    const list = await postModel.find();

    res.status(200).json({data: list})
    res.end()
})

server.post('/',async ( req, res )=> {
    const {title, body} = req.body
    const newItem = await postModel.create({title,body})

    res.status(201).json(newItem);
    res.end()
})





// -------------------- CONNECTING -------------------- 
const Connection = async ()=> {
    try {
        server.listen(process.env.PORT, async () => console.log(`Listening on http://localhost:${process.env.PORT}`));
        await mongoose.connect(process.env.MONGO_URL).then(console.log('Connection success with MongoDb'));
    } catch (error) {
        console.log('MongoDb connection error: ' + error);
    }
}

Connection();