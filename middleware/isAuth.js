module.exports ={
    userAuth : (req,res,next)=>{
        if(!req.session.user){
            return res.redirect("/userlogin")

        }
        next()
    },
    userLoggedout :(req,res,next)=>{
        if(req.session.user){
            return res.redirect("/")

        }
        next()
    },

    adminAuth :(req,res,next)=>{
        if(req.session.admin){
            next()


         
        }else{
          
            res.redirect("/adminlogin")
        }
       
        
    },
    adminLogout :(req,res,next)=>{
        if(!req.session.admin){
            next()

        }else{
            res.redirect("/admindashboard")
        }
    }
    
}