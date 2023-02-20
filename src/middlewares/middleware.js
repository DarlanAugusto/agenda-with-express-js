exports.globalMiddleware = (req, res, next) => {
  res.locals.localVar = "Estarei em todas as views!";
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if(err) res.render('404');
}

exports.csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}