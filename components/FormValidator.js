export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.urlContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this.formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.urlContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(inputEl) {
    const errorElement = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputEls) {
    let foundInvalid = false;
    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      this.disableSubmitButton(foundInvalid);
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
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this.formEl.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this.formEl.querySelector(this._submitButtonSelector);

    this.inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this.checkInputValidity(inputEl);
        this.toggleButtonState(this.inputEls, this.submitButton);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners();
  }
}
