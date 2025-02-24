import { Router } from "express";
import authController from "../controller/auth.controller.js";

const router = Router();

router.post('/register', authController.register);
router.get('/activation/:id',authController.activation);   

router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.get('/refresh',authController.refresh);

export default router;