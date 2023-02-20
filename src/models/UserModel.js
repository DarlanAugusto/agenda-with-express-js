const { default: mongoose } = require("mongoose");
const validator = require('validator');

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

  async register() {
    this.validate();
    if( this.errors.length ) return;

    try {
      this.user = await UserModel.create(this.body);
    } catch (error) {
      console.log(error);
    }
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