// const mongoose=require('mongoose')
// const tokenSchema=mongoose.Schema({
//     userId: {
//         required: true,
//         ref: "user",
//       },
//       token: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 3600,// this is the expiry time in seconds
//       },
//     });

// const tokenModel=mongoose.model('token_tb',tokenSchema)
// module.exports=tokenModel;