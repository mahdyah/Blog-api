const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{

const token=req.header('x-auth-token')
if(!token){
    return res.json('No Token Access denied!')
}
try {
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decoded
    console.log(decoded,'THE USER')
    next()
} catch (error) {
    console.log(error)
    res.status(400).json('Token not valid')
}
}