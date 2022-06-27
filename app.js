require("dotenv").config();
const express = require("express");
const app = express()
const home = require('./router/router');
const story = require('./router/story')
const user = require('./router/user')
const connectDB = require('./config/db');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./router/passport/passport');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require('./models/user')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')(session)
const flash = require('connect-flash');
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))


app.use(cookieParser('ewfeqwfiewqmjoifwjemoifwfmwoiqefj'));
app.use(
  session({
    httpOnly: true,
    secure: false,
    secret: 'weofmojiwemoijwefwefwf',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge : 7 * 24 * 60 * 60 * 1000
    },
    store : new connectMongo({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done){
    done(null, {    
        name : user.name, 
        email : user.email
    })
});

passport.deserializeUser(function(id, done){
    User.findOne(id, function(err, user){
        if(err) throw err;
        done(null, {
            id : user.id,
            email : user.email,
            name : user.name
        })
    })

})

//passport local strategy 실행
passportConfig();




app.set('view engine' , 'ejs');
app.set('views' , './views');


app.use('/' , home)
app.use('/story' , story)
app.use('/auth', user)

const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중.....`)
})