const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger"); // button
const closeButton = document.querySelector(".close-button"); // in HTML modal-content

function toggleModal() {
  modal.classList.toggle("show-modal"); // adds if not there - removes if it is
}

function windowOnClick(event) { // toggles off to exit modal when clicking away
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal); //calls toggle modal
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);