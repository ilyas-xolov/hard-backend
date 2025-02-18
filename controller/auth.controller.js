import authService from "../service/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await authService.register(email, password)
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).send({error: error});
            console.log(error);
        }
    }
    
    async activation(req, res, next) {
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            res.status(200).json({message: 'Your account has been activated'});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export default new AuthController