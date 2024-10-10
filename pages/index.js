import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

//Cards
const cardListEl = document.querySelector(".cards__list");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//Elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardLinkInput = document.querySelector("#add-card-link-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#image-modal");
const popUps = document.querySelectorAll(".modal");

const validationSettings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const formValidator = new FormValidator(settings, profileEditForm);
// formValidator.enableValidation();

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Functions
function closePopUp(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEscape(event) {
  const key = event.key;
  if (key === "Escape") {
    document.querySelectorAll(".modal_opened").forEach(closePopUp);
  }
}

//Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", function () {
    imageModal.querySelector(".modal__image").src = cardData.link;
    imageModal.querySelector(".modal__image").alt = cardData.name;
    imageModal.querySelector(".modal__image-title").textContent = cardData.name;
    openModal(imageModal);
  });
  cardListEl.prepend(card.getView());
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  console.log("1234567890");
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  addCardForm.reset();
  addFormValidator.disableSubmitButton();
}
////
// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   cardTitleEl.textContent = cardData.name;
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", () => {
//     imageModal.querySelector(".modal__image").src = cardData.link;
//     imageModal.querySelector(".modal__image").alt = cardData.name;
//     imageModal.querySelector(".modal__image-title").textContent = cardData.name;
//     openModal(imageModal);
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;

//   return cardElement;
// }

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

popUps.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopUp(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopUp(popup);
    }
  });
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData);
});
