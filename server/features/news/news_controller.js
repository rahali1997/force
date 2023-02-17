const News = require("./new_model") ; 


const cloudinary = require("../../../config/cloudinary")

exports.fetchNews = async function(req,res){
    News.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the News List: ' + err);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
              });
        }
    });
}


exports.createNews = async function (req, res){
    let result ; 
    try {
         result =  await cloudinary.uploader.upload(req.file.path)
        console.log(result.url) ;
      } catch (error) {
       return  res.send(error) ;
      } 
    const news = new News({
        title: req.body.title , 
        text: req.body.text , 
        img: result.url, //req.body.imgId , 
        createdAt : Date.now(), 
    }) ; 
    return news.save().then((newNews)=> {
        return res.status(201).json({
            success: true,
            message: 'New news created successfully',
            News: newNews,
          });
    })
    .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        });
      });
}

exports.deleteNews =  async  function(req,res){
    News.findByIdAndDelete((req.body.id), 
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
