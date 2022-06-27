const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/auth/sign-in');
  };

module.exports = {isAuthenticated}