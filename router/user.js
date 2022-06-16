const express = require('express');
const router = express.Router();
const User = require('../models/user')
const twilioClient = require('./common/twilio')


//sign-up
router.get('/sign-up' ,async(req , res) => {
    try{

        const authCode = Math.floor(100000 + Math.random() * 90000);

        console.log("authCode", authCode)


        const test = await twilioClient.messages.create({
            messagingServiceSid : process.env.TWILIO_SEND,
            to : '+8201020595897',
            body : `민영이 전용인증 번호 개발 api는 (949) 353-6367 인증 암호는 민영이 생일 0519 && 암호화 코드 6자리 주면 그때부터 민영이만 사용할수있어 어플~ㅋㅋㅋ`
        }) 

        console.log("test ::", test)  

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