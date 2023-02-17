const Discount = require("./discount_model") ; 

const cloudinary = require("../../../config/cloudinary")

exports.createDiscount = async function(req, res) { 
    let result ; 
    try {
         result =  await cloudinary.uploader.upload(req.file.path)
        console.log(result.url) ;
      } catch (error) {
       return  res.send(error) ;
      } 
    const discount = new Discount({
        img: result.url , 
        product: req.body.product,
        newPrice: req.body.newPrice , 
        unit: req.body.unit
    })
    return discount.save().then((newDiscount)=>{ 
        return res.status(201).json({
            success: true,
            message: 'New discount created successfully',
            discount: newDiscount , 
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

exports.fetchDiscounts = async function(req,res){
    Discount.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve Discounts List: ' + err);
            res.status(400).json({
                message: 'Server error. Please try again.',
                msg: err
            }) ;
        }
    });
}
exports.deleteDiscount =  async  function(req,res){
    Discount.findByIdAndDelete((req.body.id), 
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
                //error: err.message,
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

