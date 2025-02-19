import nodemailer from "nodemailer"


class mailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            secure: false,
            auth: {
                user: 'ilyasxolov2005@gmail.com',
                pass: 'gujc ikdl gzhp meof',
            },
        })
    }

    async sendMail(email, path){
               
        await this.transporter.sendMail({
            from: 'ilyasxolov2005@gmail.com',
            to: email,
            subject: `Activation account on the project: Hard-backend`,
            html: `
                <div style="margin: 1rem;">
                    <a href="${path}">Click for activate your account</a>
                </div>
            `,
        })

    }
}

export default new mailService;