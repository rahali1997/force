const multer = require('multer') ; 
//const GridFsStorage = require('multer-gridfs-storage') ; 
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv/config") ;


var storage = new GridFsStorage({
    url: process.env.DB_CONNECTION_STRING,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-pfe-${file.originalname}`;
        return filename;
      }
      return {
        bucketName: "images",
        filename: `${Date.now()}-pfe-${file.originalname}+test` ,
       // test:  `attribut data` ,
      };
    }
  });

module.exports = multer({storage})