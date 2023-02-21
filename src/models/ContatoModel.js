const { default: mongoose } = require("mongoose");
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required:false, default: '' },
  phonenumber: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body = null, user = null) {
    this.body = body;
    this.errors = [];
    this.contato = null;
    this.user = user;
  }

  async findContactById(id, userid) {
    if(typeof id !== "string") return;
    const contato_user = await ContatoModel.findOne({ user_id: userid, _id: id });
    const contato = await ContatoModel.findById(id);

    if(!contato_user && contato) {
      this.errors.push("Você não pode ver este contato!");
      return;
    } 
    this.contato = contato;
    return;
  }

  async register() {
    this.validate();
    if( this.errors.length ) return;

    await this.contactExists();
    if( this.errors.length ) return;

    this.contato = await ContatoModel.create(this.body);

  }

  validate() {
    this.cleanUp();
    this.validateName();
    this.validateEmail();
    this.validatePhoneNumber();
    this.validateContactEmpty();
  }

  validateEmail() {
    if(this.body.email && !validator.isEmail( this.body.email ) ) this.errors.push('E-mail inválido!');
  }

  validateName() {
    if( this.body.name.length < 3 ) this.errors.push('Nome do Contato deve ter no mínimo 3 caracteres!');
  }

  validatePhoneNumber() {
    if( this.body.phonenumber && (this.body.phonenumber.length !== 11 || typeof Number(this.body.phonenumber) !== "number") ) this.errors.push('Número de telefone inválido!');
  }

  validateContactEmpty() {
    if(!this.body.email && !this.body.phonenumber) this.errors.push("Informe um e-mail ou um número de telefone!");
  }

  async contactExists() {
    this.contato = await ContatoModel.findOne({ phonenumber: this.body.phonenumber, user_id: this.user_id });
    if(this.contato) this.errors.push("Já existe um contato com este Número!");
    this.contato = null;

    this.contato = await ContatoModel.findOne({ email: this.body.email, user_id: this.user_id });
    if(this.contato) this.errors.push("Já existe um contato com este E-mail");
  }

  cleanUp() {
    for(let key in this.body) {
      if(typeof this.body[ key ] !== "string") {
        this.body[ key ] = "";
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phonenumber: this.body.phonenumber,
      user_id: this.user._id
    }
  }
}

module.exports = Contato;