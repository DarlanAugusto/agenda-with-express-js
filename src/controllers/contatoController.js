const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const contato = new Contato();
  const contatos = await contato.getAll(req.session.user._id);

  res.render('index', { contatos });
  return;
}

exports.new = (req, res) => {
  res.render('contato', { contato: null });
  return;
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body, req.session.user);
    await contato.register();

    if( contato.errors.length ) {
      req.flash('errors', contato.errors);
      req.session.save(() => {
        return res.redirect('/contatos/register');
      })
      return;
    }

    req.flash("success", "Contato salvo com sucesso!");
    req.session.save(() => {
      res.redirect(`/contatos/edit/${contato.contato._id}`);
      return;
    })

  } catch (error) {
    console.log(error);
    res.render('404');
    return;
  }
}

exports.edit = async (req, res) => {
  // res.send(red.params.)

  if(! req.params.id ) return res.render('404');

  try {
    const contato = new Contato();
    await contato.findContactById(req.params.id, req.session.user._id);
    if(contato.errors.length) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        return res.redirect('/');
      });
      return;
    }
    if(!contato.contato) return res.render('404');
    return res.render('contato', { contato: contato.contato });

  } catch (error) {
    console.log(error);
    return res.render('404');

  }  
}

exports.update = async (req, res) => {
  if(!req.params.id) return;
  console.log(req.session.user);
  try {
    const contato = new Contato(req.body, req.session.user);
    await contato.update(req.params.id);
    if( contato.errors.length ) {
      req.flash("errors", contato.errors);
      req.session.save(() => {
        return res.redirect(`/contatos/edit/${req.params.id}`);
      })
      return;
    } 
    req.flash('success', "Contato atualizado com sucesso!");
    req.session.save(() => {
      console.log(contato.contato);
      return res.redirect(`/contatos/edit/${contato.contato._id}`);
    })
    return;

  } catch (error) {
    console.log(error);
    res.render('404');
  }
}

exports.delete = async(req, res) => {
  if(!req.params.id) return;

  try {
    const contato = new Contato();
    const deleted = await contato.delete(req.params.id);
    console.log(deleted);
  
    req.flash("success", `O Contato <b>${deleted.name}</b> foi removido com sucesso!`);
    req.session.save(()=> {
      return res.redirect('/contatos');
    });

  } catch (error) {
    console.log(error);
    return res.render('404');    
  }

}