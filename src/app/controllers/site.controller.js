

function siteController() {
  return {
    home(req, res) {
      res.render('home', { title: 'Home' })
    }
  }
}

module.exports = siteController
