import { Router } from "express";
import authController from "../controller/auth.controller.js";

const router = Router();

router.post('/register', authController.register);
router.get('/activation/:id',authController.activation);   
export default router;