const mongoose=require('mongoose')
const BookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date, required:true},
    checkOut:{type:Date, required:true},
    name:{type:String, required:true},
    mobile: {type:String, required:true},
    guest: Number,
    price:Number,
})

const BookingModel=mongoose.model('Booking',BookingSchema)
module.exports=BookingModel