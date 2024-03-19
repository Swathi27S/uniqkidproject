// const adminmodel = require("../models/adminmodel");
const adminSchema = require("../models/adminmodel");

const bcrypt = require("bcrypt");
const flash = require("express-flash");

module.exports = {
  //get admin login

  getAdminLogin: async (req, res) => {
    res.render("admin/adminlogin");
  },

  //post admin login

  postAdminLogin: async (req, res) => {
    try {
      const adminData = await adminSchema.findOne({ email: req.body.email });
      if (adminData && adminData.isAdmin == 1) {
        const password = await bcrypt.compare(
          req.body.password,
          adminData.password
        );
        if (password) {
          req.session.admin = adminData._id;
          res.redirect("/admindashboard");
        } else {
          res.render("admin/adminlogin", {
            err: "incorrect password",
          });
        }
      } else {
        res.render("admin/adminlogin", {
          err: "incorrect email",
        });
      }
    } catch (error) {
      res.redirect("/500");
    }
  },

  // get admin dashboard
  getDashboard: (req, res) => {
    res.render("admin/admindashboard");
  },

  //admin logout

  adminLogout: (req, res) => {
    try {
      delete req.session.admin;
      res.redirect("/adminlogin");
    } catch (error) {
      console.log("error in logout" + error);
    }
  },
};
