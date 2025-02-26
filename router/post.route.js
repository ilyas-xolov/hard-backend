import { Router } from "express";
import postController from "../controller/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { body } from "express-validator";
const router = Router();

router.get('/',authMiddleware, postController.get);
router.post('/',authMiddleware, postController.create);
router.delete('/:id',authMiddleware,postController.delete);
router.put('/:id',authMiddleware,postController.update);



export default router;  