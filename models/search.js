const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
    search : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
})



module.exports = mongoose.model('Search' , searchSchema)