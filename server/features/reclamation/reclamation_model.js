const mongoose = require("mongoose") ; 

mongoose.Promise = global.Promise;

const reclamationSchema = new mongoose.Schema({
    title: {
        type: String ,
        required: true ,  
    } , 
    isTreated: {
        type: Boolean , 
        required: true ,  
    }, 
    description : {
        type: String , 
        required : true , 
    } , 
  
    imgUrl: {
        type: String , 
        required: true , 
    }, 
    senderId : {
        type: String , 
        required: true , 
    }, 
    commercialId : {
        type: String , 
        required : true 
    }, 
    createdAt : {
        type: Date , 
    } , 
    updatedAt : {
        type : Date ,
    }

})

module.exports = mongoose.model('reclamation', reclamationSchema) ; 