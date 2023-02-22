const validator = require('validator');

export default class Contato {
  constructor() {
    this.form = document.querySelector(".form-contato");
    this.errors = false;
  }

  init() {
    if( !this.form ) return;
    this.handleEvents();
  }

  handleEvents() {
    this.handleSubimit();
    this.handleKeyPress();
  }

  handleSubimit() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.removeErrors();
      this.validate();
      if( this.errors ) return;

      this.form.submit();
      return;
    })
  }

  handleKeyPress() {

    const inputs = this.form.querySelectorAll(".input-form-contato");

    inputs.forEach(input => {
      input.addEventListener("keypress", event => {
        if(!this.errors) return;
        this.removeErrors();
      })
    });
  }

  validate() {
    this.validateName();
    this.validateEmail();
    this.validatePhoneNumber();
    this.validateContactEmpty();
  }

  validateEmail() {
    const email = this.form.querySelector("#email");
    if( email.value && !validator.isEmail(email.value) ) {
      this.createError(email, "E-mail inválido!");
      this.errors = true;
    }
  }

  validateName() {
    const name = this.form.querySelector("#name");
    console.log("aa");
    if( name.value.length < 3 ) {
      this.createError(name, "No mínimo 3 caracteres!");
      this.errors = true;
    }
  }

  validatePhoneNumber() {
    const phonenumber = this.form.querySelector("#phonenumber");
    if( phonenumber.value && (phonenumber.value.length !== 11 || typeof Number(phonenumber.value) !== "number") ) {
      this.createError(phonenumber, "Telefone inválido!");
      this.errors = true;
    }
  }

  validateContactEmpty() {
    const email = this.form.querySelector("#email");
    const phonenumber = this.form.querySelector("#phonenumber");
    if( !email.value && !phonenumber.value ) {
      this.createError(email, "Informe um e-mail!");
      this.createError(phonenumber, "Informe um telefone!");
      this.errors = true;
    }
  }

  createError(element, error) {
    const errorDiv = document.createElement("div");

    element.classList.add("is-invalid");
    errorDiv.classList.add("invalid-feedback");
    errorDiv.innerText = error;

    element.insertAdjacentElement("afterEnd", errorDiv);
  }

  removeErrors() {
    const errorsInput = this.form.querySelectorAll(".is-invalid");
    const errorsDiv = this.form.querySelectorAll(".invalid-feedback");
    
    errorsInput.forEach(error => {
      error.classList.remove("is-invalid");
    });

    errorsDiv.forEach(error => {
      error.remove();
    });
    this.errors = false;
  }
}