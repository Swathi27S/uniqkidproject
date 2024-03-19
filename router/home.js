const express=require('express');

const router=express.Router();


const homeController = require("../controller/homeController")
const cartController = require("../controller/cartController")




router.get("/",homeController.getHome)

router.get("/shop",homeController.getProducts)
router.get("/singleproduct/:id",homeController.getSingleProduct)

router.get("/cart/:id",cartController.getCart)
router.post("/addtocart",cartController.addtocart)
router.patch("/cart/changequantity/:id",cartController.changeQuantity)
router.delete("/deletecartitem/:id",cartController.deleteCartitem)


router.get("/checkout",cartController.getCheckout)







module.exports=router;
