import BaseError from "../errors/base.error.js";
import postServer from "../service/post.service.js";

class PostController {

    async get( req, res, next) {
        try {
            const params = req.query;
            const list = await postServer.get(params);
            res.status(200).json({ data:list, dataLength:list.length })
            res.end();
        } catch (error) {
            next(BaseError(500, error.message))
        }
    } 





    async create ( req, res, next) { 
        try {
            const {title, body} = req.body 
            if(!title || !body){
                throw BaseError.BadRequest('title and body required');
            }  
            const photo = req.files?.photo;
            const newItem = await postServer.create({title,body},photo);
            
            res.status(201).json(newItem);
            res.end();
        } catch (error) {
            next(error);
        }
    }




    async delete(req, res){
        try {
            const id = req.params.id;
            const data = await postServer.delete(id);
            
            if(!data){
                throw BaseError.BadRequest(`Data not found by Id`)
            }
            
            res.status(200).json({data});
            res.end();

        } catch (error) {
           next(error)
        }
    }




    async update(req, res){
        try {
            const id = req.params.id;  
            const data = await postServer.update(id,req.body);

            if(!data){
                throw BaseError.BadRequest(`Data not found by Id`)
            }

            res.status(200).json({data});
            res.end();

        } catch (error) {
           next(error)
        }
    }
    
}

export default new PostController();