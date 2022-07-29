const express=require('express')
const jwt=require('jsonwebtoken')
const {check,validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const UserModel=require('../models/UserSchema')
const router=express.Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login for the user
 *     tags: [logins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *            
 *       500:
 *         description: Some server error
 */
router.post('/'
,[
    check('email',"please provide a valid email").isEmail(),
    check('password',"check your password").notEmpty()
],
async(req,res)=>{
    const userData=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }
    try {
        const user=await UserModel.findOne({email:userData.email})

        console.log(user,'this is the user')
if(!user){
    return res.json('User not found')
}
const isMatch=await bcrypt.compare(userData.password,user.password)
if (!isMatch){
    return res.json('Wrong password please try again!')
}

const payload={
    id:user._id,
    emai:user.email,
    username:user.username
}

const TOKEN=jwt.sign(payload,process.env.SECRET_KEY)
res.status(201).json({
    user:user,
    token:TOKEN
})
    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')
    }
}
)
module.exports=router