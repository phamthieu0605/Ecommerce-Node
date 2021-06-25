const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/user.controller')

router.get('/info', userController().profile)

module.exports = router
