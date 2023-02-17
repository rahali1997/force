const mongoose = require("mongoose") ; 

mongoose.Promise = global.Promise;

const monthGoalSchema = new mongoose.Schema({
    month: {
        type : String, 
        required : true , 
    } , 
    userId : {
        type : String , 
        required : true , 
    } , 
    productGoals: {
        type : [], 
        required : true ,
    }
}) 
module.exports = mongoose.model('monthGoal', monthGoalSchema) ; 