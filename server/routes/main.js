const express  = require("express") ; 

const keycloak = require('../../config/keycloak-config.js').getKeycloak();

const productsController =  require("../features/products/products_controller") ; 
const newsController = require("../features/news/news_controller") ; 
const orderController = require("../features/order/order_controller") ;
const monthGoalController = require("../features/monthGoal/monthGoal_controller") ;  
const discountController = require("../features/discount/discount_controller") ; 
const reclamationController = require("../features/reclamation/reclamation_controller")

const cloudinary = require("../../config/cloudinary")

const upload = require('../middleware/upload') ;
const upload2 = require('../middleware/multer') ;
const router = express.Router();


const createProduct = productsController.createProduct ; 
const fetchProducts = productsController.fetchProducts ; 
const deleteProduct = productsController.deleteProduct ; 

const createNews  = newsController.createNews ; 
const fetchNews = newsController.fetchNews ; 
const deleteNews = newsController.deleteNews

const createOrder = orderController.createOrder ; 
const fetchOrders = orderController.fetchOrders ; 
const deleteOrders = orderController.deleteOrder ; 

const createMonthGoal = monthGoalController.createMonthGoal ; 
const fetchMonthGoals = monthGoalController.fetchMonthGoals ; 
const deleteMonthGoals = monthGoalController.deleteMonthGoal; 

const createDiscount = discountController.createDiscount ; 
const fetchDiscount = discountController.fetchDiscounts ; 
const deleteDiscount = discountController.deleteDiscount ; 

const createReclamation = reclamationController.createReclamation ; 
const fetchReclamation = reclamationController.fetchReclamation ; 
const deleteReclamation = reclamationController.deleteReclamation ; 
const updateReclamation = reclamationController.updateReclamation ; 



const mongoose = require("mongoose") ; 
const Grid = require('gridfs-stream') ; 
let gfs ,gridfsBucket ;
const conn = mongoose.connection ; 
conn.once("open", function(){
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images'
    });
    gfs = Grid(conn.db, mongoose.mongo) ; 
    gfs.collection("images") ; 
  } )


//   router.get('/all-user', keycloak.protect(['user-pvc','admin']), function(req, res){
//     res.send("Hello All User");
// });


router.post('/products',upload2.single("file"),createProduct) ; 
router.get('/products',/*keycloak.protect('pvc'),*/ fetchProducts ) ; 
router.delete('/products' , deleteProduct) ; 


router.post('/news', upload2.single("file"),createNews) ;
router.get('/news', fetchNews ) ; 
router.delete('/news', deleteNews ) ; 

router.post('/orders',createOrder) ;
router.get('/orders', fetchOrders ) ; 
router.delete('/orders', deleteOrders) ; 

router.post('/monthGoals',/*keycloak.protect('pvc'),*/createMonthGoal) ;
router.get('/monthGoals',/*keycloak.protect('pvc'),*/ fetchMonthGoals ) ; 
router.delete('/monthGoals',/*keycloak.protect('pvc'),*/deleteMonthGoals  ) ; 

router.post('/discounts', upload2.single("file"),createDiscount) ;
router.get('/discounts', fetchDiscount ) ; 
router.delete('/discounts', deleteDiscount ) ; 

router.post('/reclamation',upload2.single("file"), createReclamation) ; 
router.get('/reclamation',/*keycloak.protect('pvc'), */fetchReclamation) ; 
router.delete('/reclamation',/*keycloak.protect('pvc'),*/deleteReclamation) ;
router.put('/reclamation',/*keycloak.protect('pvc'), */updateReclamation ) ; 




//"test": "echo \"Error: no test specified\" && exit 1",




// router.post("/upload2", upload2.single("file"), async (req,res)=> {
//   try {
//     const result =  await cloudinary.uploader.upload(req.file.path)
//     res.json(result.url)
//   } catch (error) {
//     res.send(error) ;
//   } 
// })

// router.post("/upload", upload.single("file"), (req,res)=> {
//     console.log("====================================="+req.file) ; 
//     if (req.file === undefined) return res.send("you must select a file.") ; 
//     const imgUrl = `http://localhost:8000/api/file/${req.file.filename}` ; 
//     return res.send(imgUrl) ; 
// })

// router.get('/file/:filename', async (req,res) => {
//     try {
//         console.log("entred to get "); 
//       const file =  await gfs.files.findOne({filename: req.params.filename}) ; 
//       const readStream = gfs.createReadStream(file.filename) ; 
//       readStream.pipe(res) ;                                                                                                                                                  
//     } catch (error) {
//       res.send('not found'+ error) ; 
//     }
//   }) ;

//   router.get('/file/allimg', async (req,res) => {
//     try {
//         console.log("entred to get "); 
//       /*const file =  await*/
//        gfs.files.find().toArray((err,files)=> {
//         if (!files || files.length === 0) {
//           return res.status(200).json({
//             success: false, 
//             message: 'no files available'
//           })
//         }

//         files.map(file => {
//           if( file.contentType ==='image/jpeg'|| file.contentType==='image/png'|| file.contentType==='image/svg+xml') {
//             file.isImage = true ; 
//           }else {
//             file.isImage = false ; 
//           }
//         })
//       }) ; 

//       res.status(200).json({
//         success:true, 
//         files
//       })
//       // const readStream = gfs.createReadStream(file.filename) ; 
//       // readStream.pipe(res) ; 
//     } catch (error) {
//       res.send('not found'+ error) ; 
//     }
//   }) ;

//   router.delete("/file/:filename", async (req,res)=>{
//     try {
//       await gfs.files.deleteOne({filename: req.params.filename}) ; 
//       res.send("success") ; 
//     } catch (error) {
//       console.log(error) ; 
//       res.send("an error has accured:  " + error)
//     }
//   })

// router.post("/upload", uploadController.uploadFiles);
// router.get("/files", uploadController.getListFiles);
// router.get("/files/:name", uploadController.download);



module.exports = router ;