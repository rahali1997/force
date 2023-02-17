const cloudinary = require('cloudinary').v2 

cloudinary.config({
    cloud_name: process.env.CLOUDINAIRY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINAIRY_API_KEY , 
    api_secret:   process.env.CLOUDINAIRY_API_SECRET,
}) ;

module.exports = cloudinary ; 