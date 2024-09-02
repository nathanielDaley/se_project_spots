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
const closeEditProfileModalButton =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileModalNameInput =
  editProfileModal.querySelector(".modal__input#name");
const editProfileModalDescriptionInput = editProfileModal.querySelector(
  ".modal__input#description"
);

//New Post Modal & Elements
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalForm = document.forms["new-post-form"];
const closeNewPostModalButton = newPostModal.querySelector(".modal__close-btn");
const newPostModalImageLinkInput = newPostModal.querySelector(
  ".modal__input#image-link"
);
const newPostModalCaptionInput = newPostModal.querySelector(
  ".modal__input#caption"
);

//Card template
const cardTemplate = document.querySelector("#card");

//Cards container
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  //Create a new card by cloning the template card
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  //Get the new cards elements
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-btn");

  //Set the new cards elements from the data passed into the function
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  //Make the like button state change when clicked
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-btn_liked");
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileNameLabel.textContent = editProfileModalNameInput.value;
  profileDescriptionParagraph.textContent =
    editProfileModalDescriptionInput.value;

  closeModal(editProfileModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const cardElement = getCardElement({
    name: newPostModalCaptionInput.value,
    link: newPostModalImageLinkInput.value,
  });

  cardsList.prepend(cardElement);

  closeModal(newPostModal);
}

//Edit Profile Modal event listeners
editProfileButton.addEventListener("click", () => {
  editProfileModalNameInput.value = profileNameLabel.textContent;
  editProfileModalDescriptionInput.value =
    profileDescriptionParagraph.textContent;

  openModal(editProfileModal);
});
closeEditProfileModalButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);

// New Post Modal event listeners
newPostButton.addEventListener("click", () => {
  newPostModalCaptionInput.value = "";
  newPostModalImageLinkInput.value = "";

  openModal(newPostModal);
});
closeNewPostModalButton.addEventListener("click", () =>
  closeModal(newPostModal)
);
newPostModalForm.addEventListener("submit", handleNewPostSubmit);

//Generate cards for cards list
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
