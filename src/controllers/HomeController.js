exports.index = (req, res) => {
  console.log(req.session.user);
  res.render('index');
  return;
};