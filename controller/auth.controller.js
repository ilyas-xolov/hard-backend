import BaseError from "../errors/base.error.js";
import apiResponse from "../middleware/api-res.middleware.js";
import authService from "../service/auth.service.js";
import { validationResult } from "express-validator";
class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(BaseError.BadRequest('Error with validation', errors.array()));
            }

            const {email, password} = req.body;
            const data = await authService.register(email, password);

            res.cookie("refreshToken", data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            res.status(200).json({ data });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    
    async activation(req, res, next) {
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            res.redirect(process.env.API_URL);
        } catch (error) {
           next(error);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;

            const data =  await authService.login( email, password );

            res.cookie("refreshToken", data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});

            res.json({data});
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next){
       try {
            const { refreshToken } = req.cookies;
            res.clearCookie('refreshToken');
            const data = await authService.logout(refreshToken)
            res.json({ data });
       } catch (error) {
           next(error);
       }
    }

    async refresh(req, res, next){
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.refresh(refreshToken);
            
            res.cookie("refreshToken", data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            res.json({data});
        } catch (error) {
           next(error);
        }
    }
}

export default new AuthController