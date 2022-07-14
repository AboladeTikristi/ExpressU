const mongoose=require('mongoose')
const postSchema=mongoose.Schema({
    posterId:{},
    email:String,
    name:String,
    username:String,
    posterImage:String,
    date:String,
    time:String,
    likes:[],
    comments:[],
    postMessage:String,
    file:String,

})
const postModel=mongoose.model('post_tb',postSchema)
module.exports=postModel;