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

const editProfileButton = document.querySelector(".profile__edit-btn");
const profileNameLabel = document.querySelector(".profile__name");
const profileDescriptionParagraph = document.querySelector(
  ".profile__description"
);

//Edit Profile Modal & Elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileModalButton =
  editProfileModal.querySelector(".modal__close-btn");
const editProfileModalNameInput =
  editProfileModal.querySelector(".modal__input#name");
const editProfileModalDescriptionInput = editProfileModal.querySelector(
  ".modal__input#description"
);

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
editProfileModal.addEventListener("submit", saveProfile);
