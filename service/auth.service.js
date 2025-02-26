import userModel from "../models/user.model.js"
import userDto from "../dtos/user.dto.js";
// import bcrypt from "bcrypt"
import bcrypt from "bcryptjs";
import tokenService from "./token.service.js";
import mailService from "./mail.service.js"; 
import BaseError from "../errors/base.error.js";

class AuthService { 


    
    async register(email, easyPassword) {
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw BaseError.BadRequest("Email already exists.");
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(easyPassword, salt); 
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
            throw BaseError.UnauthorizedError("Account not found!");
        }

        findOne.isActivated = true;
        return await findOne.save();
    }




    async login(email, password){
        const userExists = await userModel.findOne({ email });
        if(!userExists){
            throw BaseError.BadRequest("Email not found")
        }

        const passIsCorrect = await bcrypt.compare(password, userExists.password);
        if(!passIsCorrect){
            throw BaseError.BadRequest("Password is incorrect");
        }

        const user = new userDto(userExists);
        const tokens = tokenService.generateToken({...user});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...user, ...tokens}

    }




    async logout(refreshToken){
        if(!refreshToken){
            throw BaseError.BadRequest("We are already logged out.");
        }

        return await tokenService.removeToken(refreshToken);
    }




    async refresh(refreshToken){
        if(!refreshToken){
            throw BaseError.UnauthorizedError("Token is not defined");
        }

        const userPayload = tokenService.verifyRefresh(refreshToken);
        const tokenDb = await tokenService.findToken(refreshToken);

        if(!userPayload || !tokenDb){
            throw BaseError.UnauthorizedError("Token not found");
        }

        const userInfo = await userModel.findById(userPayload.id);
        const user = new userDto(userInfo);
        const tokens = tokenService.generateToken({...user});

        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {...user, ...tokens}
    }
}

export default new AuthService