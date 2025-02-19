import authService from "../service/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await authService.register(email, password);

            res.cookie("refreshToken", data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            res.status(200).json({ data });
        } catch (err) {
            res.status(500).send({error: err.message});
            console.log(err);
        }
    }
    
    async activation(req, res, next) {
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            res.redirect('https://youtube.com');
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new AuthController