import jwt from "jsonwebtoken"
import tokenModel from "../models/token.model.js";

const { sign } = jwt;

class tokenService {
    generateToken(payload){
        const accessToken = sign(payload, process.env.JWT_ACCESS_KEY,{expiresIn: 15 * 60 * 1000});
        const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY,{expiresIn: 30 * 24 * 60 * 60 * 1000})

        return {accessToken, refreshToken};
    }

    async saveToken(user, refreshToken){
        const existToken = await tokenModel.findOne({ user });

        if(existToken){
            existToken.refreshToken = refreshToken;
            return existToken.save();
        }else{
            return await tokenModel.create({ user, refreshToken });
        }
    }
}

export default new tokenService