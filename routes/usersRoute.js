const express=require('express')
const userModel=require('../models/UserSchema')
const {check, validationResult } = require('express-validator')
const bcrypt=require('bcrypt')
const router = express.Router()
const jwt=require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
const app=express()
app.use(express.json())
 var regix=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - birthday
 *         - age
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the content
 *         username:
 *           type: string
 *           description: blog title
 *         email:
 *           type: string
 *           description: The blog author
 *         birthday:
 *           type: Date
 *           description: Birthday of the user
 *         age:
 *           type: string
 *           description: How old is the author
 *         password: 
 *           type: String
 *           description: The passwrod should be 8 characters long, must have number, uppar case and special character 
 *       example:
 *         id: d5fE_asz
 *         title: The Unnamed
 *         author: undefined
 * 
 *   securitySchemes:
 *     bearerAuth: 
 *       type:http
 *       scheme:bearer
 *       bearerFormat:JWT
 * 
 *   security:
 *      - bearerAuth: [] 
 * 
 * 
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/',
[
    check('username',"Username is required!").notEmpty(),
    check('email',"Please use a valid email").isEmail(),
    check('password',"Please enter a password")
    .notEmpty()
    .custom((value,{req})=>{
        return regix.test(value)
    })
    .withMessage('The passwrod should be 8 character long, must have number, uppar case and special character')
], 
async(req,res)=>{
    const userData=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }
    try {
        const userExist=await userModel.findOne({email:userData.email})
        if(userExist){
            return res.json({msg:'User already exist!'})
        }
        
const SALT=await bcrypt.genSalt(12)
const hashedPassword=await bcrypt.hash(userData.password,SALT)

userData.password=hashedPassword
const user=await userModel.create(userData)

const payload={
    id:user._id,
    username: user.username,
    email:user.email
}
const TOKEN=jwt.sign(payload,process.env.SECRET_KEY)
res.status(201).json({
    user:user, 
    token:TOKEN
})

    } catch (error) {
      console.log(error)  
      res.status(400).json('Bad Request')
    }
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
 router.get('/:id',authMiddleware,async(req,res)=>{
    const id=req.params.id
console.log(req.user)
    try {
     const content=await userModel.findById()
     res.status(200).json(content)
   } catch (error) {
    console.log(error)
    res.status(400).json({
        msg:'Id not found'
    })
   }
 })
 module.exports=router