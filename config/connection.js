
const mongoose=require("mongoose")
require('dotenv').config();

async function connectDB(){
    try{
        const DB_URI=process.env.DB_URI
        await mongoose.connect(DB_URI)
        console.log("DB connected")
    }catch(error){
    console.log("error in connectionDb "+error)
}
}

module.exports=connectDB
