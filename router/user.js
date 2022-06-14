const express = require('express');
const router = express.Router();

//sign-up
router.get('/sign-up' ,async(req , res) => {
    try{


        res.render('login/signIn')
    }catch(err){
        console.error(err)
    }
   
})

module.exports = router;