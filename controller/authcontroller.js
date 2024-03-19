const userSchema = require("../models/usermodel");
// const adminSchema=require("../models/adminmodel")
const verificationController = require("./verificationController");
const bcrypt = require("bcrypt");

module.exports = {
  // get signup

  getSignup: async (req, res) => {
    res.render("auth/usersignup");
  },

  //post signup

  postSignup: async (req, res) => {
    try {
      console.log(req.body);
      const userData = await userSchema.findOne({ email: req.body.email });
      console.log(req.body.email);
      if (userData) {
        console.log("hi");
        res.redirect("/usersignup");
      } else {
        console.log("postdata" + userData);
        const otp = await verificationController.sendEmail(req.body.email);

        req.session.userInfo = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 12),
          token: {
            otp: otp,
            generatedTime: Date.now() + 60000,
          },
        };
        console.log(
          "post signup time:" + req.session.userInfo.token.generatedTime
        );
        res.render("auth/signupotp");
      }
    } catch (error) {
      console.log("error in postsignup" + error);
    }
  },

  // get signup-otp
  getSignupOtp: async (req, res) => {
    res.render("auth/signupotp");
    console.log("get signup otp");
  },

  //post signup otp

  postSignupOtp: async (req, res) => {
    try {
      const otpValue = req.body.value;
      const otp = req.session.userInfo.token.otp;
      console.log(otp);
      const otpExpiry = req.session.userInfo.token.generatedTime;
      const date = Date.now();

      if (date < otpExpiry) {
        if (otpValue == otp) {
          console.log("otp true");
          const userData = new userSchema({
            firstName: req.session.userInfo.firstName,
            lastName: req.session.userInfo.lastName,
            email: req.session.userInfo.email,
            password: req.session.userInfo.password,
            token: {
              otp: req.session.userInfo.otp,
              generatedTime: req.session.userInfo.generatedTime,
            },
          });
          await userData.save();

          res.redirect("/userlogin");
        } else {
          res.redirect("/signupotp");
        }
      } else {
        res.send("Time expired");
      }
    } catch (error) {
      console.log("error post signupotp" + error);
    }
  },

  // Resend otp

  resendOtp: async (req, res) => {
    try {
      const otp = await verificationController.sendEmail(
        req.session.userInfo.email
      );
      generatedTime = Date.now() + 60000;
      req.session.userInfo.token.otp = otp;
      req.session.userInfo.token.generatedTime = generatedTime;

      console.log(req.session.userInfo.firstName);
      console.log("new otp" + otp);
      if (otp) {
        res.redirect("/signupotp");
      }
    } catch (error) {
      console.log("error post signupotp resend" + error);
    }
  },

  //get user login

  getlogin: (req, res) => {
    res.render("auth/userlogin");
  },

  //post userlogin

  postLogin: async (req, res) => {
    try {
      const userData = await userSchema.findOne({ email: req.body.email });
      if (userData) {
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          userData.password
        );
        if (passwordMatch) {
          if (!userData.isBlocked) {
            req.session.loggedIn = true;
            req.session.user = userData;
            res.redirect("/");
          } else {
            res.send("user is blocked");
          }
        } else {
          res.send("wrong password");
        }
      }
      console.log("login error" + error);
    } catch (error) {}
  },

  //     forgot password rendering

  getForgot: async (req, res) => {
    try {
      res.render("auth/forgot");
    } catch (error) {
      console.log("error in getforgot");
    }
  },

  //     post email

  postEmail: async (req, res) => {
    try {
      const emailExist = await userSchema.findOne({ email: req.body.email });
      if (emailExist) {
        req.session.emailExist = emailExist.email;

        res.redirect("/forgototp");
      }
    } catch (error) {
      console.log("err in postemail" + error);
    }
  },

  //     get forgot password

  getforgotPasswordOtp: async (req, res) => {
    try {
      console.log("jiii");
      const newOtp = await verificationController.sendEmail(
        req.session.emailExist
      );
      console.log(newOtp);
      const generatedTime = Date.now() + 60000;
      req.session.otp = newOtp;
      req.session.generatedTime = generatedTime;
      res.render("auth/forgototp");
    } catch (error) {
      console.log("err in getforgotpassword" + error);
    }
  },

  //postfogot otp

  postpasswordOtp: async (req, res) => {
    try {
      const otpValue = req.body.value;
      const otpTime = Date.now();
      if (otpTime < req.session.generatedTime) {
        if (otpValue == req.session.otp) {
          res.redirect("/resetpassword");
        } else {
          res.redirect("/forgototp");
        }
      } else {
        res.send("time expired");
      }
    } catch (error) {
      console.log("error in postpasswordotp" + error);
    }
  },

  // forgot password
  forgotresendOtp: async (req, res) => {
    try {
      const resendotp = await verificationController.sendEmail(
        req.session.emailExist
      );
      const resendgeneratedTime = Date.now() + 60000;
      req.session.otp = resendotp;
      req.session.generatedTime = resendgeneratedTime;

      console.log("new otp" + resend);
      if (resendotp) {
        res.redirect("/forgototp");
      }
    } catch (error) {
      console.log("error post forgototp resend" + error);
    }
  },
  //new password

  getNewPassword: async (req, res) => {
    try {
      res.render("auth/resetpassword");
    } catch (error) {
      console.log("err in get reset password");
    }
  },

  //post newpassword

  postNewpassword: async (req, res) => {
    console.log("jiii");
    try {
      const newPassword = req.body.password;
      console.log(newPassword);
      const confirmPassword = req.body.confirmPassword;
      console.log(confirmPassword);
      const emailExist = req.session.emailExist;
      if (newPassword == confirmPassword) {
        const passwordMatch = await bcrypt.hash(newPassword, 12);
        await userSchema.updateOne(
          { email: emailExist },
          { $set: { password: passwordMatch } }
        );
        res.redirect("/userlogin");
      } else {
        res.redirect("/resetpassword");
      }
    } catch (error) {
      console.log("err in  postnewpassword" + err);
    }
  },

  //userlogout

  userLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
