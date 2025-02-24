export default class tokenDto {
    id
    user
    refreshToken

    constructor(model){
        this.id = model._id
        this.user = model.user
        this.refreshToken = model.refreshToken
    }
}