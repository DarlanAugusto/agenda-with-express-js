exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.infos = req.flash('infos');
  res.locals.user = req.session.user;
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err) res.render('404');
  return;
}

exports.csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

exports.authUser = (req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/login');
  }

  next();
}