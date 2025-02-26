import { Router } from "express";
import postController from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorMiddleware from "../middleware/author.middleware.js";
const router = Router();

router.get('/',authMiddleware, postController.get); 
router.post('/',authMiddleware, postController.create);
router.delete('/:id',authMiddleware, authorMiddleware, postController.delete);
router.put('/:id',authMiddleware, authorMiddleware, postController.update);



export default router;  