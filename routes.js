const express = require('express');
const route   = express.Router();

const homeController  = require('./src/controllers/HomeController');
const userController = require('./src/controllers/userController');

// rotas da home
route.get('/', homeController.index);

// rotas do login
route.get('/login', userController.index);
route.get('/login/register', userController.new);
route.post('/login', userController.auth);

route.get('/logout', userController.logout);

// rotas do cadastro
route.post('/register', userController.register);

module.exports = route;