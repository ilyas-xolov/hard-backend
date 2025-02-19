import {Schema, model} from "mongoose";

const tokenSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

const tokenModel = model('Token', tokenSchema);

export default tokenModel;