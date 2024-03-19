const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const { ObjectId } = require("mongodb");



const fs = require("fs");
const path = require("path");

module.exports = {
  //product page rendering

  getProduct: async (req, res) => {
    try {
      const products = await productModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryName",
            foreignField: "_id",
            as: "categoryinfo",
          },
        },
        { $unwind: "$categoryinfo" },
      ]);
      console.log(products);

      res.render("admin/product", { product: products });
    } catch (error) {
      console.log("Error in getProduct:", error);
    }
  },

  //get product page

  getAddproducts: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.render("admin/addproduct", {
        category: categories,
        stockError: req.flash("stockError"),
        priceError: req.flash("priceError"),
      });
    } catch (error) {
      console.log("error in getaddproducts");
    }
  },

  //new product adding page

  addProducts: async (req, res) => {
    try {
      const price = req.body.price;

      if (isNaN(price) || price <= 0) {
        req.flash("priceError", "price must be a valid positive number");
        return res.redirect("/addproduct");
      }
      const stock = req.body.stock;
      if (isNaN(stock) || stock < 0) {
        req.flash("stockError", "stock must be a valid positive number");
        return res.redirect("/addproduct");
      }

      for (let file of req.files) {
        if (
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/jpeg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/gif" &&
          file.mimetype !== "image/webp"
        ) {
          req.flash("err", "check the image type");
          return res.redirect("/addproduct");
        }
      }
      const img = [];
      for (let items of req.files) {
        img.push(items.filename);
      }
      const product = new productModel({
        productName: req.body.productName,

        categoryName: new ObjectId(req.body.categoryName),
        size: req.body.size,
        stock: req.body.stock,
        price: req.body.price,
        usertype: req.body.usertype,
        images: img,
        description: req.body.description,
      });
      await product.save();
      res.redirect("/product");
    } catch (error) {
      console.log("error in add product" + error);
    }
  },

  // get edit page
  getEditProduct: async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      const id = req.params.id;

      const product = await productModel.aggregate([
        { $match: { _id: new ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryName",
            foreignField: "_id",
            as: "categoryinfo",
          },
        },
        { $unwind: "$categoryinfo" },
      ]);
      console.log(product[0]);
      res.render("admin/updateproduct", {
        product: product[0],
        category: categories,
        priceError: req.flash("priceError"),
        stockError: req.flash("stockError"),
      });
    } catch (error) {
      console.log("error in getedit " + error);
    }
  },

  //post edit page

  postEditProduct: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);
      const id = req.params.id;

      const {
        productName,
        categoryName,
        price,
        stock,
        size,
        usertype,
        description,
      } = req.body;
      const product = await productModel.findOne({ _id: id });

      if (isNaN(price) || price <= 0) {
        req.flash("priceError", "Price must be a valid positive number");
        return res.redirect("/admin/updateproduct/" + id);
      }
      if (isNaN(stock) || stock < 0) {
        req.flash("stockError", "Stock must be a valid positive number");
        return res.redirect("/admin/updateproduct/" + id);
      }

      product.productName = productName;
      product.categoryName = new ObjectId(categoryName);
      product.price = price;
      product.stock = stock;
      product.size = size;
      product.usertype = usertype;
      product.description = description;

      await product.save();
      if (req.files && req.files.length > 0) {
        const newImg = req.files.map((file) => file.filename);
        for (let images of product.images) {
          const imagePath = path.join("uploads", images);
          await fs.unlink(imagePath, (err) => {
            if (err) {
              console.log("errr in unlink");
            }
          });
        }
        await productModel.updateOne({ _id: id }, { $set: { images: newImg } });
      }
      res.redirect("/product");
    } catch (error) {
      console.log("errr in edit" + error);
    }
  },

  // delete product

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await productModel.findOne({ _id: id });
      console.log(data);
      await productModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
      res.redirect("/product");
    } catch (error) {
      console.log("err in deleteproducts" + error);
    }
  },
};
