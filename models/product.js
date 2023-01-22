const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'please provide a name',
        maxLength : [20 , 'name cannot be longer than 20 caracters']
    },
    img:
        {
            type : String,
        },
    description : {
        type : String,
        maxLength: [100 , 'please give a shorter description'],
        required : 'please give a description'
    },
    price : {
        type : Number,
        required : [true , 'please provide a price']
    },
    quantity : {
        type : Number,
        default : 0
    },
    rating : {
        type : Number,
        default: 5
    },
    numbreRaters : {
        type : Number,
        default : 0 ,
    },
    creationDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('product',productSchema)