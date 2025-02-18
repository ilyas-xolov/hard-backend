import { Router } from "express";
import postController from "../controller/post.controller.js";
import logger from "../middleware/logger.js";
const router = Router();

router.get('/',logger, postController.get);
router.post('/',logger, postController.create);
router.delete('/:id',postController.delete);
router.put('/:id',postController.update);



export default router;  