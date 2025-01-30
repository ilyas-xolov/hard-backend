import postModel from "../models/post.model.js";
import fileService from "./file.service.js"; 

class postServer {
    async get(params){
        return postModel.where(params);
    }

    async create(v,p){
        console.log('photo',p);
        
        const photo = null;
        return await postModel.create({...v,photo})
    }

    async delete(id){
        console.log(id);
        return await postModel.findByIdAndDelete(id);
    }

    async update(id,body){
        return await postModel.findByIdAndUpdate(id,body,{new: true}).set({__v: 1, updatedAt: new Date()});
    }
}

export default new postServer()