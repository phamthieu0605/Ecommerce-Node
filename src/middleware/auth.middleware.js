const jwt = require('jsonwebtoken');
const User = require('../app/models/user.model')


// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = checkUser
