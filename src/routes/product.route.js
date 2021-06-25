const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/product.controller')

router.get('/', productController().product)

module.exports = router
