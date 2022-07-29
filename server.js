const express=require('express')
require('dotenv').config()
var cors = require('cors')
const helmet=require('helmet')
const morgan=require('morgan')
const mongoConfig=require('./config/mongoConfig')
const blogsRoute=require('./routes/blogsRoute') 
const userRoute=require('./routes/usersRoute')
const authRoute=require('./routes/authRoute')
const app=express()
const PORT = process.env.PORT || 5000
app.set('view engine','ejs')
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use('/blogs',blogsRoute)
app.use('/user',userRoute)
app.use('/auth',authRoute) 

const readme = require('readmeio');

app.use(
  readme.metrics('rdme_xn8s9hcc00ca6852cbc7069a9666d7807bcdc481402bdd467f11d6e4b36c63e241ac0f', 
  req => ({
    apiKey: req.testing123,
    label: req.mahdyah,
    email: "req.mahdyah.taheri@gmail.com",
  }), {
    // optional, enable in development mode
    development: true, 
  })
);
// ======================>
const swaggerJsDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
//Extended: https://swagger.io/specification/#infoObject
const options={
definition:{
    openapi: "3.0.0",
    info:{
        title:"Blog API",
        version: "1.0.0",
        description: 'Blog API Information'
    },
servers:[
    {
        url: "http://localhost:3000"
    }
]
  
},
apis:['./routes/*.js']
};
const swaggerDocs=swaggerJsDoc(options) 
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//=====================================================================>



// app.get('/',(req,res)=>{
//     res.render('signup')
//     // res.status(200).json({message:'Welcome to this blog'})
// })
app.get('/',(req,res)=>{
    res.status(200).json("Welcome to my API!")
    // res.status(200).json({message:'Welcome to this blog'})
})

app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
    mongoConfig()
})