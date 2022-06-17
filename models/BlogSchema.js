const mongoose=require('mongoose')
const BlogSchema=mongoose.Schema({
    created_by:{ 
        type:String, 
        required:true
    },
    created_at:{ 
        type:String, 
        required:true
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
        type: String, 
        required:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
       }
})
 module.exports=mongoose.model('blogData',BlogSchema)