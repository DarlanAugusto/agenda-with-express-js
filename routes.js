const express = require('express');
const route   = express.Router();

const homeController  = require('./src/controllers/HomeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');

// rotas da home
route.get('/', homeController.index);

// rotas do login
route.get('/login', loginController.index);

// rotas do cadastro
route.get('/register', registerController.index);

module.exports = route;