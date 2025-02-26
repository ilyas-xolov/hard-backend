export default class userDto {
    id
    author
    title
    body
    photo
    constructor(model){
        this.id = model._id
        this.author = model.author 
        this.title = model.title
        this.body = model.body
        this.photo = model.photo 
    }
}