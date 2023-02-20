const User = require('../models/UserModel');

exports.index = (req, res) => {
  res.render('login');
  return;
}

exports.new = (req, res) => {
  res.render('register');
  return;
}

exports.register = async function (req, res) {

  const user = new User(req.body);
  await user.register();

  if(user.errors.length) {
    req.flash('errors', user.errors);

    req.session.save(() => {
      return res.redirect("/login/register");
    })

    return;
  }
  req.flash('success', 'Usuário cadastrado com sucesso! Faça o Login');
  req.session.save(() => {
    return res.redirect('login');
  });
}