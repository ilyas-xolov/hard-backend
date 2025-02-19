import userModel from "../models/user.model.js"
import userDto from "../dtos/user.dto.js";
import bcrypt from "bcrypt"
import tokenService from "./token.service.js";
import mailService from "./mail.service.js";

class AuthService { 
    async register(email, easyPassword) {
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw new Error("Email already exists.");
        }
        const password = await bcrypt.hash(easyPassword, 10);
        const userInfo = await userModel.create({ email, password});

        const user = new userDto(userInfo)
        const tokens = tokenService.generateToken({...user})

        await mailService.sendMail(email,`${process.env.API_URL}/api/auth/activation/${user.id}`);

        tokenService.saveToken( user.id, tokens.refreshToken )

        return { ...user, ...tokens }; 
    }

    async activation(userId){
        const findOne = await userModel.findById(userId);
        if(!findOne){
            throw new Error("Account not found!");
        }

        findOne.isActivated = true;
        return await findOne.save();
    }
}

export default new AuthService