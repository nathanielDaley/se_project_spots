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
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileModalButton =
  editProfileModal.querySelector(".modal__close-btn");

function openEditProfileModal() {
  editProfileModal.classList.add("modal_opened");
}

function closeEditProfileModal() {
  editProfileModal.classList.remove("modal_opened");
}

editProfileButton.addEventListener("click", openEditProfileModal);
closeEditProfileModalButton.addEventListener("click", closeEditProfileModal);
