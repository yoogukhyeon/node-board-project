const express = require('express');
const router = express.Router();
const User = require('../models/user')
//sign-up
router.get('/sign-up' ,async(req , res) => {
    try{
        res.render('login/signUp')
    }catch(err){
        console.error(err)
    }
   
})

router.post('/sign-up', async(req, res) => {

    const {name, nickName, email, password} = req.body

    console.log(req.body)

    try{
        const insertResut = await User.create({
            name : name,
            nickName : nickName,
            email : email,
            password : password,
        })

        console.log("insertResut", insertResut)

        res.redirect('/auth/sign-up')
    }catch(err){
        console.error('Error', err)
    }
})


module.exports = router;