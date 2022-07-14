const userModel=require('../models/user.model')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const crypto = require('crypto')
const postModel=require('../models/post.model')
const tokenModel=require('../models/token.model')
const messageModel=require('../models/message.model')
const cloudinary=require('cloudinary');
const SECRET=process.env.JWT_SECRET;
const jwt=require('jsonwebtoken')
const bcrypt =require('bcryptjs');
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY, 
    api_secret:process.env.API_SECRET 
  });
const landingPages=(req,res)=>{

    res.send("here got")
}
const signUp=(req,res)=>{
    const newUser=req.body;
    console.log(req.body)
    const form= new userModel(newUser)
    if (req.body!==""){
     const email=req.body.email;
     const username=req.body.username;
    
   
    userModel.findOne({email:email},(err,result)=>{
            if (err) {
                res.status(501).send({message:'Internal server error',status:false})
            }
            else{
                if(result){
                    res.send({message:'email already exist',status:false})
                }
                else{
                    userModel.findOne({username:username},(err,result)=>{
                        if (err) {
                            res.status(501).send({message:'Internal server error',status:false})
                        }
                        else{
                            if(result){
                                res.send({message:'username already exist',status:false})
                            }
                            else{
                    const form= new userModel(newUser)
                        form.save((err,result)=>{
                        if (err) {
                            console.log(err)
                            console.log(`error`)
                            res.send({message:"user signup failed, please try again later",status:false})
                        }
                        else{
                          
                            res.send({message:"registration successful",status:true})
                        }
                    })
                    }
                    }
                })
                 
                }
                
                
            }
        })
    }
}
const logIn=(req,res)=>{
    const logUser=req.body;
    console.log(req.body)
    const email=req.body.email
    const password=req.body.password
    userModel.findOne({email:email},(err,user)=>{
        if (err) {
            res.send({message:'server error',status:false})
        }
        else{
            if (!user) {
                res.send({message:'unrecognized email',staus:false})
            }
            else{
                user.validatePassword(password,(err,same)=>{
                 if (err) {
                     console.log(`an error occured`)
                 }  
                 else{
                     if(same){
                         const token=jwt.sign({email},SECRET,{expiresIn:'12h'})
                         console.log(token)
                          res.send({message:'correct password',status:true,token})
                     }
                     else{
                         res.send({message:'invalid password',status:false})
                     }
                     
                    console.log(same)
                } 
                })
            }
        }
        })


}
const resetPassword=(req,res)=>{
    console.log(req.body)
    const password=req.body.password;
    const email=req.body.email;
    const saltRound=10
   
    bcrypt.hash(password,saltRound,(err,hashedPassword)=>{
        if (err) {
            console.log(err)
        }
        else{
           var hashed=hashedPassword
           userModel.updateOne({email:email},{$set:{password:hashed}},
            (error,result)=>{
                if(error){
                    console.log(error);
                     res.send({status:false,message:"Password not set error occcured, try again"})
                 }
                 else{
                
                 res.send({status:true,message:"Password reset successful"})
             }  
           })
         }
    })

}
const forgetEmail=(req,res)=>{
const email=req.body.email
console.log(email)
    userModel.findOne({email:email},(err,user)=>{
        if(err){
            res.send({status:false,message:"User not found"})
        }
        // else if(!user){
        //     res.send({status:false,message:"This email is not registered with us ,Please input the correct email"})
        // }
        else{
            // res.send({status:true,message:"Email found",email:user.email})
            // crypto
            const realEmail=user.email
           
             // initialize nodemailer
         var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: 'ladyj2183@gmail.com',
                pass: 'sydorencexfzcmdc'
            }
        }
    );
    
    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };
    
    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))
    
    const num=Math.floor(100000 + Math.random() * 900000);
    var mailOptions = {
        from: '"Joanna" <ladyj2183@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Welcome!',
        template: 'email', // the name of the template file i.e email.handlebars
        context:{
            name:user.username, // replace {{name}} with Adebola
            company: 'ExpressU',
            email:user.email,
            token:num,
        }
    };
    
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
           console.log(error);
            res.send({status:false,message:"error sending token"})
        }
        else{
       
        res.send({status:true,message:num,email:user.email})
        console.log('Message sent: ' + info.response);
    }
    });
        }
    })
}
const getAllUser=(req,res)=>{
    userModel.find((err,result)=>{
        if (err) {
            console.log(err)
            console.log(`error`)
            res.send({message:"user details stuck!",status:false})
        }
        else{
            res.send({allUsers:result,status:true})
           
        }
    })
}
const allInfo=(req,res)=>{
    const token=req.headers.authorization.split(' ')[1]
    jwt.verify(token,SECRET,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({status:false,message:'unauthorized'})
        }
        else{
            userModel.findOne({email:result.email},(err,userDetails)=>{
                if (err) {
                    res.send({status:false,message:'internal server error'})
                }
                else{
                    res.send({status:true,message:" still valid",userDetails})
                }
            })
          
            
        }
    })
}
const uploadProfile=(req,res)=>{
    const file=req.body.file 
    const id1=req.body._id
    console.log(file)
    cloudinary.v2.uploader.upload(file,
        {folder: 'InstagramProfile',
         public_id:`/${id1}`,
         format: 'jpg' },
    
            (err, result)=> {
                if (err){
                    console.log(err)
                      res.send({message:"upload failed"})
                }
                else{console.log(result)
                    userModel.updateMany({ _id:id1}, { $set: {firstname:req.body.firstname,file:result.secure_url}}, function(err,result1) {
                        if (err) {
                         console.log(err);
                        }
                        else{
                            console.log(result1)
                            res.send({message:"file saved successfully",image:result.secure_url})
                        }
                       });
                   
                }
                
     });
     console.log(req.body.file)
}


const follow=(req,res)=>{
    console.log(req.body)
    var followId=req.body.followid
    var followersId=req.body.followersid
    var todo=req.body.message
  if(todo==="Follow"){
    userModel.findOne({_id:followId},(err,details)=>{
        if (err) {
            res.send({message:'server error',status:false})
        }
        else{
            userModel.findOne({_id:followersId},(err,sent)=>{
                if (err) {
                    res.send({message:'server error',status:false})
                }
                else{
                var load2={
                            id:followersId,
                            firstname :sent.firstname ,
                            lastname:sent.lastname,
                            followers:sent.followers,
                            follow:true,
                            following:sent.following,
                            email:sent.email,
                        }
                  
                 var load={
                            id:followId,
                            firstname :details.firstname ,
                            lastname:details.lastname,
                            followers:details.followers,
                            follow:true,
                            following:details.following,
                            email:details.email,
                        }
              console.log(details)
              userModel.updateOne({_id:followId}, {$push:{following:load2}},(error,result)=>{
                console.log(result)
                if(error){
                    console.log(error)
                    res.send({message:'server error',status:false})
                }
                else{
                    userModel.updateOne({_id:followersId}, {$push:{followers:load}},(err,message)=>{
                        console.log(message)
                        if(error){
                            console.log(err)
                            res.send({message:'server error',status:false})
                        }
                        else{
                            res.send({message:"Update successful",status:true})
                        }
                      })
                }
              })
            }})
        }
 
    })
}
else if(todo==="Unfollow"){
    userModel.findByIdAndUpdate(
        {_id:followId}, { $pull: { "following": { id:followId} } },
          (error,result)=>{
                console.log(result)
                if(error){
                    console.log(error)
                    res.send({message:'server error',status:false})
                }
                else{
                    userModel.findByIdAndUpdate(
                        {_id:followersId}, { $pull: { "followers": { id:followersId} } },(err,message)=>{
                        console.log(message)
                        if(error){
                            console.log(err)
                            res.send({message:'server error',status:false})
                        }
                        else{
                            res.send({message:"Update successful",status:true})
                        }
                      })
                }
              })
}
}
const getPost=(req,res)=>{
    postModel.find((err,result)=>{
        if (err) {
            console.log(err)
            console.log(`error`)
            res.send({message:"server error",status:false})
        }
        else{
            console.log(result)
            res.send({allPosts:result,status:true})
           
        }
    })
}
const savePost=(req,res)=>{
    const sent=req.body;
    console.log(req.body)
    const file=req.body.file;
    
            cloudinary.v2.uploader.upload(file,
                {folder: 'InstagramPosts' },
            
                    (err,result)=> {
                        if (err){
                            console.log(err)
                              res.send({message:"upload failed"})
                        }
                        else{
                            post={
                                posterId:req.body.posterId,
                                email:req.body.email,
                                name:req.body.name,
                                posterImage:req.body.posterImage,
                                date:req.body.date,
                                time:req.body.time,
                                postMessage:req.body.postMessage,
                                file:result.secure_url,
                            }
                            const form= new postModel(post)
                            form.save((error,details)=>{
                                if (error) {
                                    console.log(error)
                                    console.log(`error`)
                                    res.send({message:"upload failed, please try again later",status:false})
                                }
                                else{
                            console.log(result)
                            res.send({message:"file saved successfully",image:result.secure_url})
                        }
                        
             });
        }
    })
             
}
const like=(req,res)=>{
    const likeDetails=req.body;
    console.log(likeDetails)
    postModel.updateOne({_id:req.body.sendId}, {$push:{likes:likeDetails}},(error,result)=>{
        console.log(result)
        if(error){
            console.log(error)
            res.send({message:'server error',status:false})
        }
        else{
               res.send({message:"Update successful",status:true})
            }
          
        
    })
}
const comment=(req,res)=>{
    const commentDetails=req.body;
    console.log(commentDetails)
    postModel.updateOne({_id:req.body.sendId}, {$push:{comments:commentDetails}},(error,result)=>{
        console.log(result)
        if(error){
            console.log(error)
            res.send({message:'server error',status:false})
        }
        else{
               res.send({message:"Comment successful",status:true})
            }
          
        
    })
}
module.exports={landingPages,signUp,logIn,allInfo,uploadProfile,follow,getAllUser,getPost,savePost,like,comment,forgetEmail,resetPassword}