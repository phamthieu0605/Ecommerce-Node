const err404 = (req, res, next) => {
  if(req.accepts('html') && res.status(404)) {
    res.render('error/404', { title: '404 Not Found', layout: './layouts/custom'})
    next();
  }
}

module.exports = { err404 }
