const cors=require('cors')
const mongoose=require('mongoose')
const express=require('express')
const app=express()
const User=require('./models/User')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser')
const imagedownloader=require('image-downloader')
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret="ewagsdgwrae";
const multer=require('multer')
const fs=require('fs')
const Place=require('./models/Place')
const Booking=require('./models/Booking')

app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
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
            jwt.sign({
                name:user.name,
                id: user._id,
                email:user.email},jwtSecret,{},(e,token)=>{
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
    if(token){
        jwt.verify(token,jwtSecret,{},  (err,user)=>{
            if(err) throw err
            res.json(user);
        })
    }
    else
    {
        res.json(null)
    }
    res.json({token})
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})
app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body
    const newName='photo'+Date.now()+'.jpg'
    await imagedownloader.image({
        url:link,
        dest:__dirname + '/uploads/' + newName
    })
    res.json(newName)

})
const photosMiddleware=multer({dest:'uploads/'})
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places",  (req, res) => {
    const {token}=req.cookies
    const{
        title,
       address,
       addedPhotos,
       description,
       perks,
       extraInfo,
       checkIn,
       checkOut,
       maxGuests,
       price,
    }=req.body
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if (err) throw err
        const place=await Place.create({
            owner:userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        res.json(place)
    })
});

app.get('/user-places',(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err
        const {id}=userData
        const data=await Place.find({owner:id})
        res.json(data);
    })
})
app.get('/places/:id', async (req,res)=>{
    const {id}=req.params
    const data=await Place.findById(id)
    res.json(data)
})

app.put('/places', async(req,res)=>{
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    } = req.body;
    const {token}=req.cookies
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err
    const placeData=await Place.findById(id)
        if(userData.id===placeData.owner.toString()){
            placeData.set({
              title,
              address,
              photos: addedPhotos,
              description,
              perks,
              extraInfo,
              checkIn,
              checkOut,
              maxGuests,
              price
            });
            await placeData.save()
            res.json("Ok");
        }
    })
})

app.get('/places',async (req,res)=>{
    const data=await Place.find()
    res.json(data);
})
app.get('/places/:id',async (req,res)=>{
    const {id}=req.params;
    const data=await Place.findById(id)
    res.json(data)
})
app.post('/booking',async(req,res)=>{
    const {place,checkIn,checkOut,guests,mobile,name,cost}=req.body
    const data=await Booking.create({
      place,
      checkIn,
      checkOut,
      guests,
      mobile,
      name,
      price:cost,
    });
    res.json(data)

})
app.get('/bookings', async (req,res) => {
    const userData = req.params;
    const data=await Booking.find({user:userData.id}).populate('place') 
    res.json(data);
  });

app.listen(4000)