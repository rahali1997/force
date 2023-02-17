const mongoose = require("mongoose") ; 
const Product =  require("./products_model") ;
const cloudinary = require("../../../config/cloudinary")

const Grid = require('gridfs-stream') ; 
let gfs ,gridfsBucket ;
const conn = mongoose.connection ; 
conn.once("open", function(){
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'products'
    });
    gfs = Grid(conn.db, mongoose.mongo) ; 
    gfs.collection("products") ; 
  } )

exports.createProduct = async function(req, res) { 
   
    let result ; 
    try {
         result =  await cloudinary.uploader.upload(req.file.path)
        console.log(result.url) ;
      } catch (error) {
       return  res.send(error) ;
      } 

    const product = new Product({
        name: req.body.name , 
        price: req.body.price , 
        img: result.url , // this field  is not required from th request directly 
        description: req.body.description, 
        family: req.body.family ,
    }) ; 
    return product.save().then((newProduct)=>{
        return res.status(201).json({
            success: true,
            message: 'New product created successfully',
            product: newProduct , 
        })
    })
    .catch((error)=> {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    })
}

exports.fetchProducts = async function(req,res){
    Product.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
}

exports.deleteProduct =  async  function(req,res){
    Product.findByIdAndDelete((req.body.id), 
    function(err, data) {
        console.log("id"+req.body.id)
        if(err){
           // console.log(err);
           res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
          });
        }else if(data === null) {
            res.status(400).json({
                success: false,
                message: 'can\'t find a document with the id: ('+req.body.id+')  maybe data is already deleted',
             
              });
        }
        else{
            res.status(201).json({
                success: true,
                message: 'Deleted successfully',
                discount: data , 
            })
           
        }
    });  
    
}
