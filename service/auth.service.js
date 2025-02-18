import userModel from "../models/user.model.js"
import userDto from "../dtos/user.dto.js";
import bcrypt from "bcrypt"

class AuthService { 
    async register(email, easyPassword) {
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw new Error("Email already exists.");
        }
        console.log(easyPassword)
        const password = await bcrypt.hash(easyPassword, 10);

        const user = await userModel.create({ email, password});
        console.log(user);

        return new userDto(user); 
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