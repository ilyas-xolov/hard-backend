import jwt from "jsonwebtoken"
import tokenModel from "../models/token.model.js";
import tokenDto from "../dtos/token.dto.js";

const { sign } = jwt;

class tokenService {
    generateToken(payload){
        const accessToken = sign(payload, process.env.JWT_ACCESS_KEY,{expiresIn: '15m'});
        const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY,{expiresIn: '30d'})

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

    async removeToken(refreshToken){
        const token = await tokenModel.findOneAndDelete({ refreshToken });
        const tokenDtos = new tokenDto(token);
        return {...tokenDtos};
    }

    verifyRefresh(refreshToken){
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        } catch (error) {
            return null
        }
    }

    verifyAccess(accessToken){
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        } catch (error) {
            return null
        }
    }

    findToken(refreshToken){
        try {
            return tokenModel.findOne({ refreshToken });
        } catch (error) {
            return null
        }
    }
}

export default new tokenService