const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    place : {
        type : String,
        required : true
    },
    start : {
        type : String,
        required : true
    },
    desc : {
        type : String,
    },
    id : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
  
})



module.exports = mongoose.model('calendar' , calendarSchema)