exports.index = (req, res) => {
  if(!req.session.user) {
    res.redirect('/login');
    return;
  }
  console.log(req.session.user);
  res.render('index');
  return;
};