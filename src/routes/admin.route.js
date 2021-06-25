const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/admin.controller')

router.get('/login', adminController().login_get)
router.get('/product', adminController().product)
router.get('/', adminController().index)

module.exports = router
