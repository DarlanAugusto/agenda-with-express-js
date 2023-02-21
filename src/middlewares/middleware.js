exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.infos = req.flash('infos');
  res.locals.user = req.session.user;
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err) res.render('404');
}

exports.csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}