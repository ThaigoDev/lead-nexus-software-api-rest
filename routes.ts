const express = require('express'); 

const HomeController = require('./src/controllers/HomeControllers.ts'); 
const LoginAndSignUpController= require ("./src/controllers/LoginAndSignUpController");  
const AllUsersController = require("./src/controllers/AllUsersControllers.ts")
const SettingsController  = require ("./src/controllers/SettingsControllers.ts")  
const ProductsController= require("./src/controllers/ProductController.ts");  
const CategoryController = require("./src/controllers/CategoryController.ts"); 
const ProcessController = require("./src/controllers/ProcessController");
const SalesController = require("./src/controllers/SalesController.ts"); 
const  multer =  require('multer');   
const multerConfig = require("./src/config/multerConfig.ts"); 
const uploads = multer (multerConfig); 
const router = express.Router();
 
//Login and Singup Page API routes
router.post("/login",LoginAndSignUpController.login); 
router.post("/register",LoginAndSignUpController.createAccount);    
router.get("/leads/index/logout",HomeController.logout);  

//leads API ROUTES   
router.get("c",HomeController.getAllLeads); 
router.post("/leads/create/", uploads.single('photoLead'),HomeController.create); 
//delete 
router.post("/leads/delete/:id",HomeController.deleteLead);  
//edit 
router.post("/leads/update/:id",uploads.single('leadPhotoEdit'),HomeController.upate);

//product-page routes  
router.get("/allProduct/",ProductsController.getAllProducts); 
router.post("/product/create/", uploads.single('productPhoto'),ProductsController.createProduct); 
router.post("/product/edit/:id",uploads.single('productPhoto-edited'),ProductsController.editProduct);  
router.post("/product/delete/:id",ProductsController.deleteProduct); 
//process -routes 
router.get("/allProcess/",ProcessController.getAllProcess);  
router.post("/process/create/",ProcessController.createProcess);  
router.get("/process/delete/:id",ProcessController.deleteProcess);  
//category-route 
router.get("/allCategory/",CategoryController.getAllCategory);  
router.post("/category/create/",CategoryController.createCategory);  
router.post("/category/delete/:id",CategoryController.deleteCategory) 
//allUsers Page 
router.get("/getallUsers/",AllUsersController.getAllUsers);  
router.post('/allUsers/edit/:id',AllUsersController.editUserPermission) 
router.post("/allUsers/delete/:id",AllUsersController.deleteUser)
//sales-page 
router.get("/getAllSales/",SalesController.getSales); 
router.post("/sale/create/",SalesController.createSales);  
router.post("/sale/delete/:id",SalesController.deleteSales); 
router.post("/sale/edit/:id",SalesController.editSales); 


//settings
router.post("/settings/update/:id",uploads.single('userPhoto'),  SettingsController.updateProfile); 
module.exports = router; 

