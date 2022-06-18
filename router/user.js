const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')
const resResult = require('./common/resResult')

 const phoneMember = [
    {
        phone : '+8201065344776'
    },
    {
        phone : '+8201020595897'
    }
] 

//sign-in
router.get('/sign-in' ,async(req , res) => {
    try{
        res.render('login/signIn')
    }catch(err){
        console.error(err)
    }
   
})

//sign-in post
router.post('/sign-in', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/auth/sign-in'
}))



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

        res.redirect('/auth/sign-in')
    }catch(err){
        console.error('Error', err)
    }
})

router.post('/chkPhone',  async(req, res) => {
    let result = new Object();
    const {} = req.body
  
  try{   
    const authCode = Math.floor(100000 + Math.random() * 90000);

    for(let i =0; i < phoneMember.length; i++){
        let sendPhone = phoneMember[i].phone

        const result = await twilioClient.messages.create({
            messagingServiceSid : process.env.TWILIO_SEND,
            to : sendPhone,
            body : `민영이전용 인증번호 6자리는 ${authCode} 입니다.`
        })  
    }

 

    result = resResult(true, 200, "데이터 전송 완료", authCode);
  }catch(e){
      console.log(e);
      result = resResult(false, 500, "알수없는 오류입니다. 관리자에게 문의해주세요.", e.message);
  }finally{
      res.send(result);
  } 
})


module.exports = router;