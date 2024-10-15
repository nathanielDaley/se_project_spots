import "./index.css";
import {
  enableValidation,
  settings as validationConfig,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const cardLikedCSSClass = "card__like-btn_liked";
const modalLikedCSSClass = "modal_opened";
const savingSaveButtonText = "Saving...";
const defaultSaveButtonText = "Save";
const deletingDeleteButtonText = "Deleting...";
const defaultDeleteButtonText = "Delete";

// Api handles all fetch requests to the server
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f7822124-59b5-42fe-a8b8-2f48bd0b923b",
    "Content-Type": "application/json",
  },
});

// Profile elements
const editProfileButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__add-btn");
const profileNameLabel = document.querySelector(".profile__name");
const profileDescriptionParagraph = document.querySelector(
  ".profile__description"
);
const profileAvatar = document.querySelector(".profile__avatar");
const editProfileAvatarButton = document.querySelector(".profile__avatar-btn");

//Edit Profile Modal & Elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileModalForm = document.forms["edit-profile-form"];
const editProfileSubmitButton =
  editProfileModalForm.querySelector(".modal__submit-btn");
const editProfileModalNameInput = editProfileModal.querySelector(
  ".modal__input#name-input"
);
const editProfileModalDescriptionInput = editProfileModal.querySelector(
  ".modal__input#description-input"
);

//Edite Profile Avatar Modal & Elements
const editProfileAvatarModal = document.querySelector(
  "#edit-profile-avatar-modal"
);
const editProfileAvatarModalForm = document.forms["edit-profile-avatar-form"];
const editProfileAvatarSubmitButton =
  editProfileAvatarModalForm.querySelector(".modal__submit-btn");
const editProfileAvatarModalImageInput = editProfileAvatarModal.querySelector(
  ".modal__input#avatar-link-input"
);

//New Post Modal & Elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalForm = document.forms["new-post-form"];
const newPostSubmitButton =
  newPostModalForm.querySelector(".modal__submit-btn");
const newPostModalImageLinkInput = newPostModal.querySelector(
  ".modal__input#image-link-input"
);
const newPostModalCaptionInput = newPostModal.querySelector(
  ".modal__input#caption-input"
);

//Delete card Modal & Elements
const deleteCardModal = document.querySelector("#delete-modal");
const deleteCardConfirmButton =
  deleteCardModal.querySelector(".modal__delete-btn");
const deleteCardCancelButton =
  deleteCardModal.querySelector(".modal__cancel-btn");

//Image Modal & Elements
const imageModal = document.querySelector("#preview-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__caption");

//All close modal buttons
const closeModalButtons = document.querySelectorAll(".modal__close-btn");

//Card template
const cardTemplate = document.querySelector("#card");

//Cards container
const cardsList = document.querySelector(".cards__list");

//Used for deleting cards in handleCardDelete functions
let selectedCard, selectedCardId;

//Predefined functions
function getCardElement(data) {
  //Create a new card by cloning the template card
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  //Get the new cards elements
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-btn");

  //Set the new cards elements from the data passed into the function
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  if (data.isLiked) {
    cardLikeButton.classList.toggle(cardLikedCSSClass);
  }

  //Make the like button state change when clicked
  cardLikeButton.addEventListener("click", (evt) =>
    handleToggleLikeCard(evt, data)
  );

  //Delete card when delete button clicked
  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", () => {
    imageModalImage.src = data.link;
    imageModalCaption.textContent = data.name;
    imageModalImage.alt = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

//Utility functions
function openModal(modal) {
  modal.classList.add(modalLikedCSSClass);

  modal.focus();

  modal.addEventListener("click", handleModalOutsideClick);
  modal.addEventListener("keydown", handleModalEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove(modalLikedCSSClass);

  modal.removeEventListener("click", handleModalOutsideClick);
  modal.removeEventListener("keydown", handleModalEscapeKey);
}

function addCardToCardList(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardsList[method](cardElement);
}

function handleModalOutsideClick(evt) {
  if (evt.target.classList.contains(modalLikedCSSClass)) {
    closeModal(evt.target);
  }
}

function handleModalEscapeKey(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget);
  }
}

function handleToggleLikeCard(evt, data) {
  api
    .changeCardLikeStatus({ id: data._id, isLiked: data.isLiked })
    .then(() => {
      evt.target.classList.toggle(cardLikedCSSClass);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;

  openModal(deleteCardModal);
}

//Form submit handlers
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  editProfileSubmitButton.textContent = savingSaveButtonText;

  disableButton(editProfileSubmitButton, validationConfig);

  api
    .editUserInfo({
      name: editProfileModalNameInput.value,
      about: editProfileModalDescriptionInput.value,
    })
    .then((data) => {
      profileNameLabel.textContent = data.name;
      profileDescriptionParagraph.textContent = data.about;

      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      editProfileSubmitButton.textContent = defaultSaveButtonText;
    });
}

function handleEditProfileAvatarSubmit(evt) {
  evt.preventDefault();

  editProfileAvatarSubmitButton.textContent = savingSaveButtonText;
  console.log("tesT");

  api
    .editUserAvatar({ avatar: editProfileAvatarModalImageInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;

      evt.target.reset();

      editProfileAvatarSubmitButton.textContent = defaultSaveButtonText;

      closeModal(editProfileAvatarModal);
    })
    .catch(console.error);

  console.log();
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  newPostSubmitButton.textContent = savingSaveButtonText;

  api
    .addCard({
      name: newPostModalCaptionInput.value,
      link: newPostModalImageLinkInput.value,
    })
    .then((data) => {
      addCardToCardList(data);

      evt.target.reset();

      newPostSubmitButton.textContent = defaultSaveButtonText;

      closeModal(newPostModal);
    })
    .catch(console.error);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  deleteCardConfirmButton.textContent = deletingDeleteButtonText;

  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();

      deleteCardConfirmButton.textContent = defaultDeleteButtonText;

      closeModal(deleteCardModal);
    })
    .catch(console.error);
}

function handleDeleteCardCancel(evt) {
  evt.preventDefault();

  closeModal(deleteCardModal);
}

//Event listeners
//Edit Profile Modal event listeners
editProfileButton.addEventListener("click", () => {
  editProfileModalNameInput.value = profileNameLabel.textContent;
  editProfileModalDescriptionInput.value =
    profileDescriptionParagraph.textContent;

  resetValidation(
    editProfileModalForm,
    [editProfileModalNameInput, editProfileModalDescriptionInput],
    validationConfig
  );

  openModal(editProfileModal);
});
editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);

// Edit Profile Avatar event listeners
editProfileAvatarButton.addEventListener("click", () => {
  openModal(editProfileAvatarModal);
});
editProfileAvatarModalForm.addEventListener(
  "submit",
  handleEditProfileAvatarSubmit
);

// New Post Modal event listeners
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});
newPostModalForm.addEventListener("submit", handleNewPostSubmit);

// Delete Card Modal event listeners
deleteCardConfirmButton.addEventListener("click", handleDeleteCardSubmit);
deleteCardCancelButton.addEventListener("click", handleDeleteCardCancel);

//Close event listener for each close modal button
closeModalButtons.forEach((button) => {
  //Find the parent modal
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});

//performs all network fetchs and handles the responses
//getAppInfo returns Promise.all.
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    //generates all of the cards into picture cards and displays them on the page
    cards.forEach((card) => {
      addCardToCardList(card, "append");
    });
    //change the user information based on the data retrieved from the server
    profileNameLabel.textContent = userInfo.name;
    profileDescriptionParagraph.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch(console.error);

//enables validation on the form
enableValidation(validationConfig);
