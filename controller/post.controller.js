import postServer from "../service/post.service.js";

class PostController {

    async get( req, res ) {
        try {
            const params = req.query;
            const list = await postServer.get(params);
            res.status(200).json({ data:list, dataLength:list.length })
            res.end();
        } catch (error) {
            res.status(500).json({error: "Internal server error: " + error});
            res.end();
        }
    } 

    async create ( req, res ) { 
        try {
            const {title, body} = req.body   
            const photo = req.files?.photo;
            const newItem = await postServer.create({title,body},photo);
            
            res.status(201).json(newItem);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Internal server error: "+ error});
            res.end();
        }
    }

    async delete(req, res){
        try {
            const id = req.params.id;
            const data = await postServer.delete(id);

            if(!data){
                res.status(400).json({error:'Not found by Id'});
                res.end();
                return;
            }
            
            res.status(200).json({data});
            res.end();

        } catch (error) {
            res.status(500).json({error: "Internal server error: " + error});
            res.end();
        }
    }

    async update(req, res){
        try {
            const id = req.params.id;  
            const data = await postServer.update(id,req.body);

            if(!data){
                res.status(400).json({error:'Not found by Id'});
                res.end();
                return;
            }

            res.status(200).json({data});
            res.end();

        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Internal server error: " + error});
            res.end();
        }
    }
}

export default new PostController();