const mongoose = require('mongoose')
const bcrypt = require("bcrypt"); 
const saltRounds = 10; 

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    nickName : {
        type : String,
        require : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
})

// save되기 전에 Hashing을 하기 위해 pre메소드 내부에 Hash Function 작성
userSchema.pre("save", function (next) {
    const user = this; // userSchema를 가르킴

   if (user.isModified('password')) {
      // password가 변경될 때만 Hashing 실행
      // genSalt: salt 생성
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hashedPassword) {
          // hash의 첫번째 인자: 비밀번호의 Plain Text
          if (err) return next(err);
          user.password = hashedPassword; // 에러없이 성공하면 비밀번호의 Plain Text를 hashedPassword로 교체해줌
          next(); // Hashing이 끝나면 save로 넘어감
        })
      })
    } else {
      // password가 변경되지 않을 때
      next(); // 바로 save로 넘어감
    } 
  })


module.exports = mongoose.model('User' , userSchema)