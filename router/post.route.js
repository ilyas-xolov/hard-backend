import { Router } from "express";
import postController from "../controller/post.controller.js";
const router = Router();

router.get('/', postController.get);
router.post('/', postController.create);
router.delete('/:id',postController.delete);
router.put('/:id',postController.update);



export default router;