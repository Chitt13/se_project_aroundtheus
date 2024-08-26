function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEL, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEL, inputEl, options);
  }

  hideInputError(formEL, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".popup__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("#add-card-link-input");

  if (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
      }
    });

    const inputs = form.querySelectorAll(".form__input");

    inputs.forEach((input) => {
      input.addEventListener("input", function (event) {
        event.target.setCustomValidity("");
        toggleButtonState(form);
      });

      input.addEventListener("invalid", function (event) {
        if (event.target.validity.valueMissing) {
          event.target.setCustomValidity("Please fill out this field.");
        } else if (
          event.target.validity.typeMismatch &&
          event.target.type === "url"
        ) {
          event.target.setCustomValidity("Please enter a web address.");
        } else if (event.target.validity.tooShort) {
          event.target.setCustomValidity(
            `Please lengthen this text to ${event.target.minLength} characters or more (you are currently using ${event.target.value.length} characters).`
          );
        }
      });
    });

    const toggleButtonState = (form) => {
      const button = form.querySelector('button[type="submit"]');
      button.disabled = !form.checkValidity();
    };

    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        toggleButtonState(form);
      });
    });
  }
});

const modal = document.querySelector(".modal__container");

const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

//console.log("#" + inputEl.id + "-error");   IS THE SAME AS
//console.log(`#${inputEl.id}-error`);
