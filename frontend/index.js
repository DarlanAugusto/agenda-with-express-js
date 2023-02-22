import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';
import Login from './modules/Login';
import Contato from './modules/Contato';
import Register from './modules/Register';

const login = new Login();
const contato = new Contato();
const register = new Register();

login.init();
contato.init();
register.init();