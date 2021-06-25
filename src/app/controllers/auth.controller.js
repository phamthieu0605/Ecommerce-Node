const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { phone: '', email: '', password: '', repassword: '' }

  if(err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  if(err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

  if(err.code === 11000) {
    errors.email = 'That email is already registered'
    errors.phone = 'That phone is already registered'
    return errors
  }

  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: maxAge,
  });
};

function authController() {
  return {
    login_get(req, res) {
      res.render('auth/login', { title: 'Login', layout: './layouts/custom' })
    },

    register_get(req, res) {
      res.render('auth/register', { title: 'Register', layout: './layouts/custom'})
    },

    async register_post(req, res) {
      const { fullname, phone, email, password } = req.body

      try {
        const user = await User.create({ fullname, phone, email, password })
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
        console.log(user)
      } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
      }
    },

    async login_post(req, res) {
      const { email, password } = req.body
      
      try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id })
      } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
      }
    },

    logout_get(req, res) {
      res.cookie('jwt', '', { maxAge: 1 })
      res.redirect('/')
    }
  }
}

module.exports = authController
