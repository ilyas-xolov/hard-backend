import postModel from "../models/post.model.js";
import fileService from "./file.service.js"; 
import postDto from "../dtos/post.dto.js"
import BaseError from "../errors/base.error.js";
class postServer {
    async get(author){
        const data = await postModel.find({ author }).sort({createdAt: -1});
        const result = [];
        data.map(item=>{
            result.push(new postDto(item))
        })
        return result
    }

    async create(v,image){ 
        const photo = image ? fileService.save(image) : null; 
        const res = {...v,photo} 
        const data =  await postModel.create(res)
        return new postDto(data);
    }

    async delete(id){
        
        const data = await postModel.findByIdAndDelete(id);
        return new postDto(data);
    }

    async update(id, body){

        const data =  await postModel.findByIdAndUpdate(id,body,{new: true}).set({__v: 1, updatedAt: new Date()});
        return new postDto(data);
    }
}

export default new postServer()