const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
 
    username:{
        type: String, 
        required:true
     },
     email: {
         type:String, 
         required:true
     },
     birthday: {
         type:String,
         required:true
         },
    age:{ 
     type: String,
     required:false
 },
    password: {
     type:String, 
     required:true
 }
})
module.exports=mongoose.model('user',UserSchema)