const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema)

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async auth() {
    if( this.errors.length ) return;

    this.user = await UserModel.findOne({ email: this.body.email });

    if(!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Usuário e/ou senha incorretos!');
      this.user = null;
      return;
    }

  }

  async register() {

    this.validate();
    if( this.errors.length ) return;
    
    await this.userExists();
    if( this.errors.length ) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);

  }

  validate() {
    this.validateEmail();
    this.validatePassword();
    this.cleanUp();
  }

  validateEmail() {
    if( !validator.isEmail(this.body.email) ) this.errors.push("E-mail inválido!");
  }

  validatePassword() {
    if( this.body.password.length < 6 || this.body.password.length > 30 ) {
      this.errors.push("A senha precisa ter entre 6 e 30 caracteres!");
    } 

    if( this.body.password !== this.body.confirm_password) {
      this.errors.push("As senhas devem ser iguais!");
    } 
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push("Este usuário já existe!");
  }

  cleanUp() {
    for(let key in this.body) {
      if(typeof this.body[ key ] !== 'string') {
        this.body[ key ] = ''; 
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = User;