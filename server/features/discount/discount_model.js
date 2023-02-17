const mongoose = require("mongoose") ; 
//const Product =  require("../products/products_model") ;

mongoose.Promise = global.Promise;
//const product = {} ; 

const discountSchema = new mongoose.Schema({
    img: {
        type: String , 
        require: true , 
    } ,
    product 
    : {
        type: {} ,  //product ,
        required: true ,  
    } ,
    newPrice:{
        type: Number , 
        required: true ,  
    } , 
    unit : {
        type: String , 
        required: true , 
    }
}) ; 

module.exports = mongoose.model('discount',discountSchema ) ;