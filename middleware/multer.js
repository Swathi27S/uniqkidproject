const multer = require("multer");
const path = require("path")

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./uploads")
    },
    filename :(req,file,cb)=>{
        const uniqueName = Date.now() + "-" + file.originalname
        cb(null,uniqueName)
    }
})
module.exports = multer({storage:storage})