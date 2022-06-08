require("dotenv").config();
const express = require("express");
const app = express()
const home = require('./router/router');
const story = require('./router/story')
const connectDB = require('./config/db');
const path = require('path')

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))

app.set('view engine' , 'ejs');
app.set('views' , './views');


app.use('/' , home)
app.use('/story' , story)
const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중.....`)
})