const express = require('express');
const router = express.Router();
const User = require('../models/user')
const twilioClient = require('./common/twilio')


//sign-up
router.get('/sign-up' ,async(req , res) => {
    try{

        const authCode = Math.floor(100000 + Math.random() * 90000);

        console.log("authCode", authCode)


     /*    const test = await twilioClient.messages.create({
            messagingServiceSid : process.env.TWILIO_SEND,
            to : '+8201020595897',
            body : `민영이 전용 핸드폰 인증 개발코드 테스트 입니다 민영이 생일이 인증번호 0519 이며 다른 인증번호 암호화 테스트 입니다~ 테스트니 삭제해라~~ㅋㅋㅋㅋ`
        }) */

      /*   console.log("test ::", test)  */

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