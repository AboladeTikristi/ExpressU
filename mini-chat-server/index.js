const express=require('express')
const app =express()
const bodyParser=require('body-parser')
app.use(express.static(__dirname+'/build'))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(bodyParser.json({limit:"50mb"}))
var messageController = require('./controllers/message.controller')
const cors=require('cors')
const mongoose=require("mongoose")
const URI="mongodb+srv://AboladeTikristi:tikristi@cluster0.8i7iv.mongodb.net/mini_chat?retryWrites=true&w=majority"
mongoose.connect(URI,(err)=>{
      if (err) {
        console.log("mongoose not connected yet")
        console.log(err)    
      }
      else{console.log('mongoose connected successfully')
   
      
     
    }
})
app.use(cors())
require('dotenv').config()
const PORT=process.env.PORT||5000
// app.get('/*'),(req,res)=>{
//   res.sendFile(__dirname+"/build/index.html")
// }
const userRouter=require("./routes/user.route")
app.use(userRouter)
var connection=app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})
// const socketServer=require('socket.io')
// const io=socketServer(connection,{cors:{options:"*"}})
// io.on("connection", (socket) => {
//   console.log('A Connection has been made')
//   socket.on('disconnect', ()=> {
//       console.log('A disconnection has been made')
//   })
// })
// const socketServer=require('socket.io')
// const io=socketServer(connection,{cors:{options:"*"}})
// io.on('connection',(socket)=>{
//  console.log("connected successfully")
//  setInterval(messageController.sendMessage,5000);
//  messageController.sendMessage(io);
// // console.log(socket.id)
// // socket.on('sendMessage',(message)=>{
// //   console.log(message)
// //   io.emit("receiveMessage",message)
// // })
// // socket.on('disconnect',()=>{
// // console.log("Disconnected successfully")
// // });
// })