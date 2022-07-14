const mongoose=require('mongoose')
const messageSchema=mongoose.Schema({
    senderId:String,
    receiverId:{},
    messageDetails:[]
})
const messageModel=mongoose.model('message_tb',messageSchema)
module.exports=messageModel