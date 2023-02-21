const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  console.log(req.session.user);

  const contato = new Contato();
  const contatos = await contato.getAll(req.session.user._id);

  res.render('index', { contatos });
  return;
};