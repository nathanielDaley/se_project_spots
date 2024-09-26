const initialCards = [
  {
    name: "Val Thorens",
    link: "./images/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "./images/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "./images/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest canopy",
    link: "./images/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "./images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "./images/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Woolridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Profile elements
const editProfileButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__add-btn");
const profileNameLabel = document.querySelector(".profile__name");
const profileDescriptionParagraph = document.querySelector(
  ".profile__description"
);

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

//Code that runs when the web page was loaded
//Generate cards for cards list
initialCards.forEach((card) => {
  addCardToCardList(card, "append");
});

//Predifined functions
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

  //Make the like button state change when clicked
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-btn_liked");
  });

  //Delete card when delete button clicked
  cardDeleteButton.addEventListener("click", () =>
    cardsList.removeChild(cardElement)
  );

  cardImage.addEventListener("click", () => {
    imageModalImage.src = data.link;
    imageModalCaption.textContent = data.name;
    imageModalImage.alt = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");

  modal.focus();

  modal.addEventListener("click", handleModalOutsideClick);
  modal.addEventListener("keydown", handleModalEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  modal.removeEventListener("click", handleModalOutsideClick);
  modal.removeEventListener("keydown", handleModalEscapeKey);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileNameLabel.textContent = editProfileModalNameInput.value;
  profileDescriptionParagraph.textContent =
    editProfileModalDescriptionInput.value;

  disableButton(editProfileSubmitButton, settings);

  closeModal(editProfileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: newPostModalCaptionInput.value,
    link: newPostModalImageLinkInput.value,
  };

  addCardToCardList(card);

  evt.target.reset();

  disableButton(newPostSubmitButton, settings);

  closeModal(newPostModal);
}

function addCardToCardList(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardsList[method](cardElement);
}

function handleModalOutsideClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function handleModalEscapeKey(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget);
  }
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
    settings
  );

  openModal(editProfileModal);
});
editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);

// New Post Modal event listeners
newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});
newPostModalForm.addEventListener("submit", handleNewPostSubmit);

//Close event listener for each close modal button
closeModalButtons.forEach((button) => {
  //Find the parent modal
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});
