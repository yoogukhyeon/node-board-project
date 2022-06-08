const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    place : {
        type : String,
        required : true
    },
    start : {
        type : String,
        required : true
    },
    cal : {
        type : String,
    },
    createAt : {
        type : Date,
        default : Date.now
    },
  
})



module.exports = mongoose.model('place' , placeSchema)