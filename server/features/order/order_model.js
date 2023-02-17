const mongoose = require("mongoose") ; 

mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
    products: {
        type: [] ,
        required: true ,  
    } , 
    pvcId: {
        type: String , 
        required: true ,  
    }, 
    commercialId : {
        type: String , 
        required : true , 
    } , 
    // remark: {
    //     type: String, 
    //     required: true, 
    // } , 
    isValidated: {
        type: Boolean , 
        required: true , 
    }, 
    isDelivered : {
        type: Boolean , 
        required: true , 
    },
    createdAt : {
        type: Date , 
        required: true , 
    },
    totalePrice : {
        type: Number , 
        required: true , 
    }

})

module.exports = mongoose.model('order', orderSchema) ; 