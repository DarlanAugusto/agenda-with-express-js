const express = require('express');
const route   = express.Router();
const { authUser } = require('./src/middlewares/middleware');

const homeController    = require('./src/controllers/HomeController');
const userController    = require('./src/controllers/userController');
const contatoController = require('./src/controllers/contatoController');

// home
route.get('/', authUser, homeController.index);

// login
route.get('/login', userController.index);
route.get('/login/register', userController.new);
route.post('/login', userController.auth);

// logout
route.get('/logout', userController.logout);

// cadastro
route.post('/register', userController.register);

// contatos
route.get('/contatos', authUser, contatoController.index);
route.get('/contatos/register', authUser, contatoController.new);
route.get('/contatos/edit/:id', authUser, contatoController.edit);
route.post('/contatos/register', authUser, contatoController.register);
route.post('/contatos/edit/:id', authUser, contatoController.update);
route.get('/contatos/delete/:id', authUser, contatoController.delete);


module.exports = route;