const mongoose = require("mongoose");
CustomError = require('./CustomError')

const errorHandler = (err,res,)=>{
    if(err instanceof CustomError){
        return(res.status(err.status).json({success : false ,msg : err.message}))
    }
    if(err.name ==="ValidationError"){
        return (res.status(403).json({success : false ,type :  err.errors.name, msg : err.errors.message}))
    }
    if(err.name ==="CastError"){
        return (res.status(403).json({success : false ,type :  err.errors.name, msg : err.msg.reason.message}))
    }
    res.status(500).json({success : false ,type : 'an error has occured please try again'})
}

module.exports = errorHandler