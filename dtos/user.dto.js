export default class userDto {
    id
    email 
    isActivated
    constructor(model){
        this.id = model._id
        this.email = model.email 
        this.isActivated = model.isActivated || false 
    }
}