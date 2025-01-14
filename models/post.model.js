import {Schema, model} from "mongoose";

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
},{timestamps: true})


export default model('Post',postSchema)