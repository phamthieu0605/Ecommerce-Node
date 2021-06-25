
function userController() {
  return {
    profile(req, res) {
      res.render('user/profile', { title: 'Profile' })
    }
  }
}

module.exports = userController
