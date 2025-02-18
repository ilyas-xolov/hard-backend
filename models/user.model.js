import {Schema, model} from "mongoose";

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false}
},{timestamps: true});

const userModel = model("User", User);

export default userModel;