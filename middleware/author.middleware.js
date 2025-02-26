import BaseError from "../errors/base.error.js";
import postModel from "../models/post.model.js";

export default async (req, res, next)=>{
    const find = await postModel.findById(req.params.id);
    const author = req.user.id;
    if(!find){
        next(BaseError.BadRequest(`Data not found by id`));
    }

    if(find.author != author){
        next(BaseError.BadRequest(`Only author can edit or delete this post`));
    }
    next();
}