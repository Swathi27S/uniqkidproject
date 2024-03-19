const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const userSchema = require("../models/usermodel");
const { ObjectId } = require("mongodb");
const addressSchema =require("../models/addressModel")

module.exports = {
  // getcart page

  getCart: async (req, res) => {
    try {
      const userid = req.session.user._id;
      const cartDetails = await cartModel.aggregate([
        { $match: { userId: new ObjectId(req.session.user._id) } },
        { $unwind: "$item" },
        {
          $lookup: {
            from: "products",
            localField: "item.productId",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        {
          $addFields: {
            total: { $multiply: ["$item.quantity", "$item.price"] },
          },
        },
        {
          $group: {
            _id: "$_id",
            userId: { $first: "$userId" },
            total: { $sum: "$total" },
            products: {
              $push: {
                _id: "$item._id",
                productId: "&item.productId",
                quantity: "$item.quantity",
                total: "$total",
                size: "$item.size",
                Product: {
                  _id: "$productInfo._id",
                  productName: "$productInfo.productName",
                  price: "$productInfo.price",
                  images: "$productInfo.images",
                },
              },
            },
          },
        },
      ]);

      const item = cartDetails[0].products.length;
      const total = cartDetails[0].total;
      const products = cartDetails[0].products;
      console.log(products);
      console.log(cartDetails[0]);
      res.render("user/cart", {
        userData: req.session.user,
        item,
        total,
        products,
      });
    } catch (error) {
      console.log("error in get cart" + error);
    }
  },

  // addtocart

  addtocart: async (req, res) => {
    try {
      console.log(req.body);
      const exist = await cartModel.findOne({
        userId: new ObjectId(req.session.user._id),
        "item.productId": new ObjectId(req.body.productId),
        "item.size": req.body.size,
      });
      console.log(exist);
      if (exist) {
        const index = exist.item.findIndex((product) => {
          return (
            product.productId.equals(new ObjectId(req.body.productId)) &&
            product.size == req.body.size
          );
        });

        console.log(index);
        await cartModel.updateOne(
          {
            userId: new ObjectId(req.session.user._id),
            "item.productId": new ObjectId(req.body.productId),
            "item.size": req.body.size,
          },
          { $inc: { [`item.${index}.quantity`]: 1 } }
        );
        res.sendStatus(200);
      } else {
        await cartModel.updateOne(
          {
            userId: new ObjectId(req.session.user._id),
          },

          {
            $push: {
              item: {
                productId: new ObjectId(req.body.productId),
                size: req.body.size,
                quantity: 1,
                price: Number(req.body.price),
              },
            },
          },
          { upsert: true }
        );
        res.sendStatus(200);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // change quantity

  changeQuantity: async (req, res) => {
    try {
      const cartDetails = await cartModel.find({
        userId: req.session.user._id,
        "item._id": req.params.id,
      });

      const updatedCart = await cartModel.updateOne(
        {
          userId: new ObjectId(req.session.user._id),
          "item._id": new ObjectId(req.params.id),
        },
        { $inc: { "item.$.quantity": Number(req.body.quantity) } }
      );
      res.json({ success: true });
    } catch (error) {
      console.log("err in updatequanity");
    }
  },

  // deletecart

  deleteCartitem: async (req, res) => {
    try {
      const userid = req.session.user._id;
      const itemid = req.params.id;
      await cartModel.updateOne(
        { userId: new ObjectId(req.session.user._id) },
        { $pull: { item: { _id: new ObjectId(req.params.id) } } }
      );
      res.redirect(`/cart/${userid}`);
    } catch (error) {
      console.log("error in delete item" + error);
    }
  },

// get checkout

getCheckout : async(req,res)=>{
  try {
    const userid = req.session.user._id;
    req.session.cart =true;
    const address= await addressSchema.find({userId:userid,isDeleted :false});
    const cartDetails = await cartModel.aggregate([
      { $match: { userId: new ObjectId(req.session.user._id) } },
      { $unwind: "$item" },
      {
        $lookup: {
          from: "products",
          localField: "item.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $addFields: {
          total: { $multiply: ["$item.quantity", "$item.price"] },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          total: { $sum: "$total" },
          products: {
            $push: {
              _id: "$item._id",
              productId: "&item.productId",
              quantity: "$item.quantity",
              total: "$total",
              size: "$item.size",
              Product: {
                _id: "$productInfo._id",
                productName: "$productInfo.productName",
                price: "$productInfo.price",
                images: "$productInfo.images",
              },
            },
          },
        },
      },
    ]);

    const item = cartDetails[0].products.length;
    const total = cartDetails[0].total;
    const products = cartDetails[0].products;
    console.log(products);
    console.log(cartDetails[0]);
    res.render("user/checkout", {
      userData: req.session.user,
      item,
      address,
      total,
      products,
    });

  }catch(error){
    console.log("error in get checkout"+error)
  }
}





};
