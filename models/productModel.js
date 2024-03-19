
const mongoose = require("mongoose")
const Schema=mongoose.Schema

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true

    },
    categoryName : {
       
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
        
        

    },
    size:{
        type : [String],
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    images:{
        type: Array,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    description:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false

    },
    usertype:{
        type:String,
        required:true
    }

});
const productModel= new mongoose.model('product',productSchema)
module.exports=productModel