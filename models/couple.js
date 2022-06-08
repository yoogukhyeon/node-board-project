const mongoose = require('mongoose')
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const {stripHtml} = require("string-strip-html");
const coupleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String
    },
    snippet : {
        type : String
    },
    createAt : {
        type : Date,
        default : Date.now
    },
    slug : {
        type : String,
        required : true,
        unique: true
    }
})

coupleSchema.pre('validate' , function(next){
    if(this.content){
        this.content = htmlPurify.sanitize(this.content)
        this.snippet = stripHtml(this.content.substring(0,200)).result
    }

    next();
})


module.exports = mongoose.model('Couple' , coupleSchema)