const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {      
      try {
        
        const exUser = await User.findOne({ email : "rnrgus5897@gmail.com" });

        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            done(null, exUser);
          } else {
            done(null, false, { message: '생년월일이 틀렸어요 누구시죠?' });
          }
        } else {
          done(null, false, { message: '모르는사람이네요.' });
        } 
      } catch (error) {
        console.error(error);
        done(error);
      } 
    }));
  };