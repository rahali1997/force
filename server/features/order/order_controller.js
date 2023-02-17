const Order =  require("./order_model") ;

exports.createOrder = async function(req, res) { 
   

    const order = new Order({
        products : req.body.products, 
        pvcId : req.body.pvcId , 
        commercialId : req.body.commercialId , 
        //remark : req.body.remark ,  because we alredy have remark in the product description 
        isValidated: false , 
        isDelivered: false , 
        createdAt: Date.now(),
        totalePrice: req.body.totalePrice,
    }); 
    return order.save().then((newOrder)=>{
        return res.status(201).json({
            success: true,
            message: 'New order created successfully',
            order: newOrder , 
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

exports.fetchOrders = async function(req,res){
    Order.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve the Course List.',
                error: err.message,
              });
        }
    });
}

exports.deleteOrder =  async  function(req,res){
    Order.findByIdAndDelete((req.body.id), 
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

