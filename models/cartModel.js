const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema ({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        required:true
       
    },
    
  
    item:[
        {
            productId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'product',
                required : true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:Number,
                required:true
            },
            size:{
                type:String,
                required:true
            }
            

        },
    ],
   
})

const cartModel = new mongoose.model("cart",cartSchema)
module.exports=cartModel