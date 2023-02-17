const MonthGoal = require("./monthGoal_model") ; 

exports.createMonthGoal = async function(req, res) { 
    const monthGoal = new MonthGoal({
        month : req.body.month , 
        userId : req.body.userId , 
        productGoals: req.body.productGoals     
    })
    return monthGoal.save().then((newMonthGoal)=>{
        return res.status(201).json({
            success: true,
            message: 'New monthGoal created successfully',
            monthGoal: newMonthGoal , 
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

exports.fetchMonthGoals = async function(req,res){
    MonthGoal.find((err, docs) => {
        if (!err) {
            res.json( {
                data: docs
            });
        } else {
            console.log('Failed to retrieve MonthGoals List: ' + err);
        }
    });
}

exports.deleteMonthGoal =  async  function(req,res){
    MonthGoal.findByIdAndDelete((req.body.id), 
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

