const express=require('express');
const router=express.Router();
const userController = require("../controller/userController")
const isAuth = require ("../middleware/isAuth")



router.get("/profile",isAuth.userAuth,userController.getUserProfile)
router.get("/editprofile/:id",isAuth.userAuth,userController.getEditProfile)
router.patch("/editprofile/:id",isAuth.userAuth,userController.postEditProfile)

router.get("/addaddress/:id",isAuth.userAuth,userController.getAddAddress)
router.post("/addaddress",isAuth.userAuth,userController.postAddAddress)

router.get("/editaddress/:id",isAuth.userAuth,userController.getEditAddress)
router.patch("/editaddress/:id",isAuth.userAuth,userController.postEditAddress)
router.delete("/deleteaddress/:id",isAuth.userAuth,userController.deleteAddress)

router.get("/changepassword/:id",userController.getChangepassword)
router.patch("/changepassword/:id",userController.postChangepassword)

module.exports=router;