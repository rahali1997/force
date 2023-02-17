
const Reclamation = require("./reclamation_model") ; 
const cloudinary = require("../../../config/cloudinary") ;

exports.createReclamation = async function(req, res) { 
   // let result ; 
    // try {
    //      result =  await cloudinary.uploader.upload(req.file.path)
    //     console.log(result.url) ;
    //   } catch (error) {
    //    return  res.send(error) ;
    //   } 
    const reclamation = new Reclamation({
       title: req.body.title , 
       isTreated: req.body.isTreated,
       description: req.body.description , 
       imgUrl: req.body.imgUrl  , 
       senderId: req.body.senderId , 
       commercialId: req.body.commercialId ,
       createdAt: Date.now() , 
    })
    return reclamation.save().then((newReclamation)=>{ 
        return res.status(201).json({
            success: true,
            message: 'New reclamation created successfully',
            reclamation: newReclamation , 
        })
    })
    .catch((error)=> {  
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    })
} 
exports.fetchReclamation = async function(req,res){
    Reclamation.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve Reclamation List: ' + err);
            res.status(400).json({
                message: 'Server error. Please try again.',
                msg: err
            }) ;
        }
    });
}

exports.deleteReclamation =  async  function(req,res){
    Reclamation.findByIdAndDelete((req.body.id), 
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
            res.status(200).json({
                success: true,
                message: 'Deleted successfully',
                discount: data , 
            })
           
        }
    });  
    
}

exports.updateReclamation = async function(req,res){
    console.log("entred to update") ; 

    Reclamation.findOne({_id: req.body.id}, function(err, reclamation){
        if(!err){
          
            reclamation.title = req.body.title ; 
            reclamation.status = req.body.status ; 
            reclamation.description = req.body.description ; 
            reclamation.updatedAt = Date.now() ;
            //reclamation.img // image will be created 
            reclamation.save(function(err) {
                if(!err) {
                    //res.json({"reclamation": reclamation}) ; 
                    res.status(201).json({
                        success: true,
                        message: 'Updated successfully',
                        reclamation: reclamation , 
                    })
                }
                else {                  
                   res.status(400).json({
                    success: false,
                    message: 'could not update reclamation',
                    error: err.message
                 
                  });
                }
            });
        }else {
            res.status(500).json({
                success: false,
                message: 'could not update reclamation. Please try again.',
                error: err.message,
              });
        }
    })
}
