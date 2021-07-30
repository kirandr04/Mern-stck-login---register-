import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app =express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology:true
},()=>{
    console.log("Connected to DB")
})
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User= new mongoose.model("User",userSchema)
//Routes
app.post("/login",(req,res)=>{
    // res.send("My API login")
    const {email,password}=req.body  
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message: "Login Successfil !!!!",user:user})
            }else{
                res.send({message: "incorrect password "})
            }

        }else{
            res.send({message:"Not registered"})
        }
    }) 
})

app.post("/register",(req,res)=>{
    // res.send("My API register")
    // console.log(req.body)
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user exists ..."})
        }else{
            const user= new User({
                name,
                email,
                password
            })
            user.save( err =>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message: "Register successful !!!"})
                }
            })

        }
    })
    
})
app.listen(9002,()=>{
    console.log("started at port 9002")
})