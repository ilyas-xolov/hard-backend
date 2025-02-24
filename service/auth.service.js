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

    async login(email, password){
        const userExists = await userModel.findOne({ email });
        if(!userExists){
            throw new Error("Email not found")
        }

        const passIsCorrect = await bcrypt.compare(password, userExists.password);
        if(!passIsCorrect){
            throw new Error("Password is incorrect");
        }

        const user = new userDto(userExists);
        const tokens = tokenService.generateToken({...user});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...user, ...tokens}

    }

    async logout(refreshToken){
        if(!refreshToken){
            throw new Error("We are already logged out.");
        }

        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw new Error("Token is not defined");
        }

        const userPayload = tokenService.verifyRefresh(refreshToken);
        const tokenDb = await tokenService.findToken(refreshToken);

        if(!userPayload || !tokenDb){
            throw new Error("Token not found");
        }

        const userInfo = await userModel.findById(userPayload.id);
        const user = new userDto(userInfo);
        const tokens = tokenService.generateToken({...user});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...user, ...tokens}
    }
}

export default new AuthService