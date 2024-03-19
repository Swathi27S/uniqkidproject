const router=require("express").Router()

const authController=require("../controller/authcontroller")

const isAuth = require("../middleware/isAuth")


router.get("/usersignup", authController.getSignup)
router.post("/usersignup",authController.postSignup)

router.get("/signupotp",authController.getSignupOtp)
router.post("/signupotp",authController.postSignupOtp)
router.get("/resend-otp",authController.resendOtp)

router.get("/userlogin",authController.getlogin)
router.post("/userlogin",  authController.postLogin)
router.get("/userlogout",authController.userLogout)

router.get("/forgot",authController.getForgot)

router.post("/submitemail",authController.postEmail)
router.get("/forgototp",authController.getforgotPasswordOtp)
router.post("/forgototp",authController.postpasswordOtp)
router.get("/resendotp",authController.getforgotPasswordOtp)
router.get("/resetpassword",authController.getNewPassword)
router.post("/resetpassword",authController.postNewpassword)




module.exports = router;