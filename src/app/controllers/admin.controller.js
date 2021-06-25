

function adminController() {
  return {
    index(req, res) {
      res.render('admin/index', { title: 'Dashboard', layout: './layouts/custom'})
    },
    login_get(req, res) {
      res.render('admin/login', { title: 'Admin login', layout: './layouts/custom'})
    },
    product(req, res) {
      res.render('admin/product', { title: 'Admin product', layout: './layouts/custom'})
    }
  }
}

module.exports = adminController
