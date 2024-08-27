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
const profileNameLabel = document.querySelector(".profile__name");
const profileDescriptionParagraph = document.querySelector(
  ".profile__description"
);

//Edit Profile Modal & Elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileModalForm = editProfileModal.querySelector(".modal__form");
const closeEditProfileModalButton =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileModalNameInput =
  editProfileModal.querySelector(".modal__input#name");
const editProfileModalDescriptionInput = editProfileModal.querySelector(
  ".modal__input#description"
);

//Card template
const cardTemplate = document.querySelector("#card");

//Cards container
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  let cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function openEditProfileModal() {
  editProfileModalNameInput.value = profileNameLabel.textContent;
  editProfileModalDescriptionInput.value =
    profileDescriptionParagraph.textContent;
  editProfileModal.classList.add("modal_opened");
}

function closeEditProfileModal() {
  editProfileModal.classList.remove("modal_opened");
}

function saveProfile(evt) {
  evt.preventDefault();

  profileNameLabel.textContent = editProfileModalNameInput.value;
  profileDescriptionParagraph.textContent =
    editProfileModalDescriptionInput.value;

  closeEditProfileModal();
}

editProfileButton.addEventListener("click", openEditProfileModal);
closeEditProfileModalButton.addEventListener("click", closeEditProfileModal);
editProfileModalForm.addEventListener("submit", saveProfile);

//Generate cards for cards list
for (let card of initialCards) {
  cardsList.append(getCardElement(card));
}
