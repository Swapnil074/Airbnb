const cors=require('cors')
const mongoose=require('mongoose')
const express=require('express')
const app=express()
const User=require('./models/User')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser')

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret="ewagsdgwrae";

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))
mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req,res)=>{
    res.json('test ok')
})
 
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
    const user=await User.create({
        name,email,password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(user)

    }
    catch(e){
        res.status(422).json(e);
    }
})

app.post('/login',async(req,res)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(user){
        const passOk=bcrypt.compareSync(password,user.password);
        if(passOk){
            jwt.sign({id: user._id,email:user.email},jwtSecret,{},(e,token)=>{
                if(e) throw e
                else
        res.cookie('token',token).json(user);

            })
        }
        else{
        res.json('!passOk');
        }
    }
    else{
        res.json('user not found')
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    res.json({token})
})

app.listen(4000)