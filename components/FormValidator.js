export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
    this._inputEls = [...this._formEl.querySelectorAll(settings.inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  }

  // _showInputError(inputEl, { inputErrorClass, errorClass }) {
  //   const errorMessageEl = this_formEl.querySelector(`#${inputEl.id}-error`);
  //   inputEl.classList.add(this._inputErrorClass);
  //   errorMessageEl.textContent = inputEl.validationMessage;
  //   errorMessageEl.urlContent = inputEl.validationMessage;
  //   errorMessageEl.classList.add(errorClass);
  // }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.urlContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  // _hideInputError(_formEl, inputEl) {
  //   const errorElement = this._formEl.querySelector(`#${inputEl.id}-error`);
  //   inputEl.classList.remove(this._inputErrorClass);
  //   errorElement.textContent = "";
  //   errorElement.classList.remove(this._errorClass);
  // }

  _hideInputError(inputEl) {
    console.log(inputEl);
    const errorElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  // _toggleButtonState(inputEls) {
  //   let foundInvalid = false;
  //   this._inputEls.forEach((inputEl) => {
  //     if (!inputEl.validity.valid) {
  //       foundInvalid = true;
  //     }
  //   });
  //   if (foundInvalid) {
  //     this.disableSubmitButton(foundInvalid);
  //   } else {
  //     this.enableSubmitButton();
  //   }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(inputEl) {
    console.log("I'm inside");
    if (!inputEl.validity.valid) {
      console.log("I am in here");
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  // _setEventListeners() {
  //   this._inputEls = Array.from(
  //     this._formEl.querySelectorAll(this._inputSelector)
  //   );
  //   this._submitButton = this._formEl.querySelector(this._submitButtonSelector);

  //   this._inputEls.forEach((inputEl) => {
  //     inputEl.addEventListener("input", (e) => {
  //       this._checkInputValidity(inputEl);
  //       this._toggleButtonState(this._inputEls, this._submitButton);
  //     });
  //   });
  // }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
