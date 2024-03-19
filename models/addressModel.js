const mongoose = require("mongoose")
const Schema=mongoose.Schema


const addressSchema =  new  mongoose.Schema({
    

   
    phonenumber :{
        type:Number,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true

    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true

    },
    phonenumber:{
        type:Number,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
const addressModel= new mongoose.model('address',addressSchema)
module.exports=addressModel