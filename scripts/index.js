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

//Cards
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = document.querySelector("#add-modal-close-button");

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
const imageModalCloseButton = imageModal.querySelector(
  "#image-modal-close-button"
);
const modalImage = imageModal.querySelector("#modal-image");

//Functions

function closePopUp(popup) {
  console.log(popup);
  popup.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

//Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  addCardForm.reset();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    imageModal.querySelector(".modal__image").src = cardData.link;
    imageModal.querySelector(".modal__image").alt = cardData.name;
    imageModal.querySelector(".modal__image-title").textContent = cardData.name;
    openModal(imageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "Escape") {
    closePopUp(profileEditModal);
  }
});

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "Escape") {
    closePopUp(addCardModal);
  }
});

document.addEventListener("mousedown", function (closePopUp) {
  const modalOpened = document.querySelector(".modal_opened");
  if (closePopUp.target.classList.contains("modal_opened"))
    closePopUp(addCardModal);
});

newCardCloseButton.addEventListener("click", () => closePopUp(addCardModal));

imageModalCloseButton.addEventListener("click", () => closePopUp(imageModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
