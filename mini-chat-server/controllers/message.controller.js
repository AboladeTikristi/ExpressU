
const messageModel=require('../models/message.model')
const cloudinary=require('cloudinary');
const SECRET=process.env.JWT_SECRET;
const jwt=require('jsonwebtoken')
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET 
  });
  const io = require("socket.io")(8800,{
    cors:{
        origin:{options:"*"}
    }
  });
  let activeUsers=[]

  io.on("connection",(socket)=>{
        //add new user
        socket.on('new-user-add',(newUserId)=>{
            if (!activeUsers.some((user)=>user.userId===newUserId))
             {
               activeUsers.push({
                userId:newUserId,
                socketId:socket.id // this provides unique socket id
               })  
            }
            console.log('user connected',activeUsers)
            io.emit('get-users', activeUsers)
        })
        socket.on('send-message',(data)=>{
            const {messagePerson}=data;
            const user=activeUsers.find((user)=> user.userId===messagePerson)
            console.log("sending sockect towars receiver id")
            console.log("data", data)
            if (user) {
                var messageDet={
                    action:"sent",
                    id:data.sender,
                    message:data.messageSent,
                    dated:req.body.dated,
                    timeSent:data.time,
                    dateSent:data.date,
                }
                io.to(user.socketId).emit('receive-message',messageDet)
                console.log('receive message')
            }

        })
        socket.on('disconnect',()=>{
            activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id) // the socketId is autommatically captured from the client side the active user is disconnecting
            console.log("user disconnected",activeUsers)
            io.emit('get-users',activeUsers)
        })
  })

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
const sendMessage=(req,res,)=>{
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
            dated:req.body.dated,
            timeSent:time,
            dateSent:dates,
            
        }
    ]
    messageModel.find({'senderId':{ $in:[senderId]}},(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
            
        }
        else if(result.length===0){
            messageModel.find({'senderId':{ $in:[receiverId]}},(err,result)=>{
                console.log(result)
                if(err){
                    console.log(err)
                    
                }
               
                else{
                    messageModel.find({'receiverId':{ $in:[senderId]}},(err2,result2)=>{
                        console.log(result2)
                        if(err2){
                            console.log(err2)
                           
                        }
                        else if(result2.length===0){
                            console.log('here')
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
                        else if(result2.length!==0){
                            console.log('wee')
                            console.log(result2)
                            messageModel.updateOne(
                                {'senderId':{ $in:[senderId,receiverId]}}, 
                                { $push: { messageDetails: 
                                    {
                                    action:"sent",
                                    id:senderId,
                                    message:message,
                                    dated:req.body.dated,
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
       
        else{
            messageModel.find({'receiverId':{ $in:[receiverId]}},(err2,result2)=>{
                console.log(result2)
                if(err2){
                    console.log(err2)
                   
                }
                else if(result2.length===0){
                    console.log('here')
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
                else if(result2.length!==0){
                    console.log('wee')
                    console.log(result2)
                    messageModel.updateOne(
                        {'senderId':{ $in:[senderId,receiverId]}}, 
                        { $push: { messageDetails: 
                            {
                            action:"sent",
                            id:senderId,
                            message:message,
                            dated:req.body.dated,
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