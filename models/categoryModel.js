const mongoose=require('mongoose');

const categorySchema= new mongoose.Schema({
    category :{
        type : String,
        required :true

    },
    description:{
        type :String,
        required : true
    },
    
    
    
    isDeleted:{
        type:Boolean,
        required:true,
        default:false

    }
})
const catmodel=mongoose.model('category',categorySchema)
module.exports=catmodel;