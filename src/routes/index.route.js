const authRoute = require('./auth.route')
const siteRoute = require('./site.route')
const productRoute = require('./product.route')
const userRoute = require('./user.route')
const adminRoute = require('./admin.route')
const checkUser = require('../middleware/auth.middleware')
const { err404 } = require('../middleware/error.middleware')

function route(app) {
  

  app.use('*', checkUser)
  app.use('/admin', adminRoute)
  app.use('/user', userRoute)
  app.use('/product', productRoute)
  app.use('/account', authRoute)
  app.use('/', siteRoute)
  app.use('*', err404)
}

module.exports = route
