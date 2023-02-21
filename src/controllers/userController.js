const User = require('../models/UserModel');

exports.index = (req, res) => {
  if(req.session.user) {

    req.flash('infos', 'Você já <b>está logado</b>! Faça <a href="/logout"><b>Logout</b></a> para acessar a área de Login.');
    req.session.save(() => {
      return res.redirect('/');
    });
    return;
  }

  res.render('login');
  return;
}

exports.new = (req, res) => {
  if(req.session.user) {

    req.flash('infos', 'Você já <b>está logado</b>! Faça <a href="/logout"><b>Logout</b></a> para acessar a área de Cadastros.');
    req.session.save(() => {
      return res.redirect('/');
    });
    return;
  }

  res.render('register');
  return;
}

exports.auth = async function (req, res) {
  try {
    const user = new User(req.body);
    await user.auth();
  
    if(user.errors.length) {
      
      req.flash('errors', user.errors);
      req.session.save(() => {
        return res.redirect("/login");
      })
  
      return;
    }

    req.session.user = user.user;
    req.flash('success', 'Login realizado com sucesso!');

    req.session.save(() => {
      return res.redirect('/');
    });
    
  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }
}

exports.register = async function (req, res) {
  try {
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
      return res.redirect('/login');
    });

  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
  return
}