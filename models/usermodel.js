const mongoose=require('mongoose');




const userschema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        otp:{
            type:Number
        },
        generatedTime:{
            type:Date
        }
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

    
});

const usermodel=new mongoose.model('user',userschema)
module.exports=usermodel;