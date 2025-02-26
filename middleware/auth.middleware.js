import BaseError from "../errors/base.error.js"
import tokenService from "../service/token.service.js";

export default (req,res,next)=>{
    try {
        const { authorization } = req.headers;
        if(!authorization){
            return next(BaseError.UnauthorizedError());
        }

        const accessToken = authorization.split(' ')[1]
        if(!accessToken){
            return next(BaseError.UnauthorizedError());
        }


        const userInfo = tokenService.verifyAccess(accessToken);
        if(!userInfo){
            return next(BaseError.UnauthorizedError());
        }

        req.user = userInfo;
        next();

    } catch (error) {
        return next(BaseError.UnauthorizedError());
    }
}