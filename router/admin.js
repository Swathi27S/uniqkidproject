const router=require("express").Router();
const path = require("path")

const adminController=require("../controller/adminController");
const userController = require("../controller/userController");
const categoryController = require("../controller/categoryController")
const productController = require("../controller/productController")
const multer=require("multer");

const upload = require("../middleware/multer")
const isAuth = require("../middleware/isAuth")






router.get("/adminlogin",isAuth.adminLogout,adminController.getAdminLogin)
router.post("/adminlogin",adminController.postAdminLogin)
router.get("/adminlogout",isAuth.adminAuth,adminController.adminLogout)

router.get("/admindashboard",isAuth.adminAuth,adminController.getDashboard)

router.get("/userList",isAuth.adminAuth,userController.getUser)
router.get("/userblock/:id",isAuth.adminAuth,userController.userBlock)
router.get("/userunblock/:id",isAuth.adminAuth,userController.userUnblock)

router.get("/category",isAuth.adminAuth,categoryController.getCategory)
router.get("/addcategory",isAuth.adminAuth,categoryController.getAddCategory)
router.post("/addCategory",isAuth.adminAuth,categoryController.postAddcategory)
router.get("/updatecategory/:id",isAuth.adminAuth,categoryController.getEditcategory)
router.patch("/updatecategory/:id",isAuth.adminAuth,categoryController.postEditcategory)
router.delete("/deleteCategory/:id",isAuth.adminAuth,categoryController.deleteCatgory)

router.get("/product",isAuth.adminAuth,productController.getProduct)
router.get("/addproduct",isAuth.adminAuth,productController.getAddproducts)
router.post("/addproduct",isAuth.adminAuth,upload.array("images",3),productController.addProducts)
router.get("/admin/updateproduct/:id",isAuth.adminAuth,productController.getEditProduct)
router.patch("/updateproduct/:id",isAuth.adminAuth,upload.array("images",3),productController.postEditProduct)
router.delete("/deleteproduct/:id",isAuth.adminAuth,productController.deleteProduct)









module.exports = router;