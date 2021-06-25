
function productController() {
  return {
    product(req, res) {
      res.render('product', { title: 'Product' })
    }
  }
}

module.exports = productController
