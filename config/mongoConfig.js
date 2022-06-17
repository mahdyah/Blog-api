const mongoose=require('mongoose')

module.exports=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        mongoose.connect
    } catch (error) {
        console.log(error)
    }
}

