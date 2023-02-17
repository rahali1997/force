const mongoose = require("mongoose") ; 

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    name: {
        type: String , 
        required: true, 
    },
    price: {
        type: Number , 
        require: true 
    }, 
    img: {
        type: String , 
        require: true , 
    } , 
    description: {
        type: String , 
        required: true, 
    },
    family: {
        type: String , 
        required: true , 
    }
}) ; 

module.exports = mongoose.model('product',productSchema )