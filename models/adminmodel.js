const mongoose=require('mongoose');




const adminschema=new mongoose.Schema({
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
    isAdmin:{
        type:Number,
        default:1
    },
    token:{
        otp:{
            type:Number
        },
        generatedTime:{
            type:Date
        }
    }
    
});

const adminmodel=mongoose.model('admin',adminschema)
module.exports=adminmodel;