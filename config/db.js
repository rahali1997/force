// require("dotenv/config") ;

// module.exports = {
//     url: process.env.DB_CONNECTION_STRING,
//     database: "forcedeventeDatabase",
//     imgBucket: "photos",
//   };
const mongoose = require('mongoose') ; 

module.exports = async function connection(){
    try {
        const connectionParams = {
            useUnifiedTopology: true , 
            useNewUrlParser: true, 
            useCreateIndex:true
        }
       
    } catch (error) {
        
    }
}
