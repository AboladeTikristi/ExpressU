
const messageModel=require('../models/message.model')
const cloudinary=require('cloudinary');
const SECRET=process.env.JWT_SECRET;
const jwt=require('jsonwebtoken')
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET 
  });

const allMessages=(req,res)=>{
    messageModel.find((err,result)=>{
        if (err) {
           console.log(err)
           res.send({status:false,messsage:'could not find any messages'}) 
        }
        else{
            res.send({status:true,message:"found them",result})
        }
    })
  }
const sendMessage=(req,res)=>{
    // console.log("function called");
    console.log(req.body)
    var senderId=req.body.sender
    var receiverId=req.body.messagePerson
    var message=req.body.messageSent
    var dates=req.body.date
    var time=req.body.time
    var messageDetails=[
        {
            action:"sent",
            id:senderId,
            message:message,
            timeSent:time,
            dateSent:dates,
            
        }
    ]
    messageModel.find({'senderId':{ $in:[senderId,receiverId]}},(err,result)=>{
        if(err){
            console.log(err)
            
        }
       
        else{
            messageModel.find({'receiverId':{ $in:[senderId,receiverId]}},(err2,result2)=>{
                console.log(result2)
                if(err2){
                    console.log(err2)
                   
                }
                else if(!result2.senderId){
                    console.log(result2)
                    const form= new messageModel({senderId,receiverId,messageDetails})
                    form.save((err4,result)=>{
                            if (err4) {
                                console.log(err4)
                                console.log(`error`)
                                res.send({message:"mail failed, please try again later",status:false})
                            }
                            else{
                                res.send({message:"operation successful",status:true})
                            
                            }
                    })
                }
                else if(result2.senderId){
                    messageModel.updateOne(
                        {'receiverId':{ $in:[senderId,receiverId]}}, 
                        { $push: { messageDetails: 
                            {
                            action:"sent",
                            id:senderId,
                            message:message,
                            timeSent:time,
                            dateSent:dates,
                            
                        }} },(err3,result)=>{
                            if (err3){
                                res.send({status:false,message:"message not sent"})
                            }   
                            else{
                                res.send({status:true,message:"message sent"})
                            }
                        }
                      
                    );
                }
            })
        }
    })
  
}
module.exports={allMessages,sendMessage}