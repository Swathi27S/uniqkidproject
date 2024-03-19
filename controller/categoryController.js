const catModel = require("../models/categoryModel");
const fs = require("fs");
const path = require("path");

module.exports = {
  getCategory: async (req, res) => {
    try {
      const category = await catModel.find({ isDeleted: false });
      console.log(category);
      res.render("admin/category", {
        cat: category,
        error: req.flash("error"),
      });
    } catch (error) {
      console.log("err in cat" + error);
    }
  },

  //get addd category

  getAddCategory: (req, res) => {
    res.render("admin/addcategory", { error: req.flash("error") });
  },

  // post add category
  postAddcategory: async (req, res) => {
    try {
      const categoryDetails = await catModel.findOne({
        category: req.body.category.toUpperCase(),
      });
      if (categoryDetails) {
        req.flash("error", "category already exist");
        res.redirect("/addcategory");
      } else {
        const categories = new catModel({
          category: req.body.category.toUpperCase(),

          description: req.body.description,
        });
        await categories.save();
        console.log("hhiiii");
        res.redirect("/category");
      }
    } catch (error) {
      console.log("err in add category" + error);
    }
  },

  //get edit category

  getEditcategory: async (req, res) => {
    try {
      const id = req.params.id;
      const cat = await catModel.findOne({ _id: id });
      res.render("admin/updatecategory", {
        itemcat: cat,
        error: req.flash("error"),
      });
    } catch (error) {
      console.log("error in getedit" + error);
    }
  },

  // post edit category
  postEditcategory: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);
      const newCatName = req.body.category.toUpperCase();
      const catdes = req.body.description;
      const existingCat = await catModel.findOne({ category: newCatName });

      if (existingCat) {
        req.flash("error", " cannot edit ,category already exist");
        res.redirect("/updatecategory/" + req.params.id);
      } else {
        await catModel.updateOne(
          { _id: id },
          { $set: { category: newCatName, description: catdes } }
        );
        res.redirect("/category");
      }
    } catch (error) {
      console.log("error in postedit" + error);
    }
  },

  // delete category

  deleteCatgory: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await catModel.findOne({ _id: id });
      console.log(data);
      await catModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
      res.redirect("/category");
    } catch (error) {
      console.log("err in deletecat" + error);
    }
  },
};
