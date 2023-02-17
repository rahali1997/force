const mongoose = require("mongoose") ; 

mongoose.Promise = global.Promise;

const NewsSchema = new mongoose.Schema({
    title : {
        type: String, 
        required: true , 
    }, 
    text : {
        type: String , 
        required: true , 
    }, 
    img: {
        type: String , 
        require: true , 
    } ,
    createdAt :{
        type: Date, 
        required : true, 
    } , 
    // cloudinary_id : {
    //     type: String , 
    //     required: true , 
    // }
})

module.exports = mongoose.model('news',NewsSchema )