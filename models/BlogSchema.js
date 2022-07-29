const mongoose=require('mongoose')
const BlogSchema=mongoose.Schema({
    created_by:{ 
        type:String, 
        required:false
    },
    created_at:{ 
        type: String,
   
    },
    blog_title: {
        type:String, 
        required:true
    },
    blog_content: {
        type:String, 
        required:true
    },
    private: {
        type: Boolean, 
       
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
       }
})
 module.exports=mongoose.model('blogData',BlogSchema)