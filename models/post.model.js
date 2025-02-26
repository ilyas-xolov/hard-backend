import {Schema, model} from "mongoose";

const postSchema = new Schema({
    author: {type: Schema.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    body: {type: String, required: true},
    photo: {type: String },
},{timestamps: true})

const postModel = model('Post',postSchema);
export default postModel;