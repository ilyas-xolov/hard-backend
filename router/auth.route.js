import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { body, param } from "express-validator";

const router = Router();

router.post(
    '/register',
    body('password').isLength({min: 6, max: 20}), 
    body('email').isEmail(), 
    authController.register
);

router.get('/activation/:id',authController.activation);   

router.post('/login',
    body('password').isLength({min: 6, max: 20}), 
    body('email').isEmail(),
    authController.login
);
router.post('/logout',authController.logout);
router.get('/refresh',authController.refresh);

export default router;