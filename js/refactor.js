let fetchresults;


function fetchData(url) {
  return fetch(url)
    .then((result) => result.json())
    .then((result) => createCards(result))
    .then((result) => fetchresults = result)
  //   createModals(result);
  // })
  // .then((result) => getCards(result))
  // .then((result) => addEventListenerToCards(result))
  // .then(() => addEventListenerToModalButtons())
  // .then(() => console.log("done"))
  // .catch(error => console.log(error));

  // .then(() => {})
  // .then(() => console.log('MORE TO DO'));
  // because of return results
}






/**
 * Rewriting this
 * Make a list of what's called - try a second script and just call inside event listeners - don't need to create a modal for each one - just the one being called
 */









// Found in both the card and modal window - selects the paragraph that contains the email
const firstParagraph = "p:first-of-type";
/**
 * Modal Code - build this function and have fetch pass it for now - get the button working - gotta get one out of here
 */

/**
 *
 * @param {*} result
 */

function createModals(result) {
  let index = 0;

  result.results.forEach((element) => {
    dob = new Date(element.dob.date).toLocaleDateString();

    const modalHTML = `
    <div class="modal" data-index-number = "${index}">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${element.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${element.name.first} ${element.name.last}</h3>
            <p class="modal-text">${element.email}</p>
            <p class="modal-text cap">${element.location.city} ${element.location.state}</p>
            <hr>
            <p class="modal-text">${element.phone}</p>
            <p class="modal-text">${element.location.street.number} ${element.location.street.name} ${element.location.city}
                ${element.location.state} ${element.location.postcode} ${element.location.country}</p>
            <p class="modal-text">${dob} </p>
        </div>
    </div>`;
    modalContainer.insertAdjacentHTML("beforeend", modalHTML);
    index++;
  });

  const modalButtonHTML = `<div class="modal-btn-container">
  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
  <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>`;

  modalContainer.insertAdjacentHTML("beforeend", modalButtonHTML);
  getCards(result);
}

/**
 *
 * @param {*} results
 * @returns
 */

function getCards(results) {
  // console.log(results);
  const cards = document.getElementById("gallery").children;
  addEventListenerToCards(cards);
}

/**
 * Adds Event Listeners To Cards
 * @param {HTMLCollection} cards
 */
function addEventListenerToCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    // console.log(cards[i]);
    cards[i].addEventListener("click", (e) => {
      kickOutWhatINeed(cards[i]);
    });
  }
}

/**
 *
 * @param {HTMLElement} card
 */
function kickOutWhatINeed(card) {
  const chosenCardEmail = card.querySelector(firstParagraph).textContent; // Gives email
  showModal(chosenCardEmail);
}

/**
 *
 * @param {*} chosenCard
 */

function showModal(chosenCardEmail) {
  const email = chosenCardEmail;
  const collection = document.querySelectorAll(".modal");
  const modalContainer = document.querySelector(".modal-container");

  collection.forEach((modal) => {
    const modalEmail = modal.querySelector("p:first-of-type").innerText;
    if (email === modalEmail) {
      const closeButton = modal.querySelector(".modal-close-btn");
      modalContainer.style.display = "block";
      modal.style.display = "block";
      modal.classList.add("active");
      closeButton.addEventListener("click", (e) => {
        modal.style.display = "none";
        modalContainer.style.display = "none";
        modal.classList.remove("active");
      });
    }
  });
}

/**
 *
 * @param {*} index
 */
function ChangeModal(index) {
  const modalLength = document.querySelectorAll(".modal").length;
  const collection = document.querySelectorAll(".modal");
  if (index < 0) {
    index = modalLength - 1;
  } else if (index > modalLength - 1) {
    index = 0;
  } else {
    console.log(index);
  }
  console.log(index);
  collection.forEach((modal) => {
    const closeButton = modal.querySelector(".modal-close-btn");
    closeButton.addEventListener("click", (e) => {
      modal.style.display = "none";
      modalContainer.style.display = "none";
      modal.classList.remove("active");
    });

    if (parseInt(modal.dataset.indexNumber) === index) {
      modal.classList.add("active");
      modal.style.display = "block";
      console.log("yeah");
    }
  });
}

/**
 * What was I doing last?
 * showModal fucntion - takes card email and checks in first of type
 */

function addEventListenerToModalButtons() {
  const previousButton = document.getElementById("modal-prev");
  const nextButton = document.getElementById("modal-next");
  previousButton.addEventListener("click", (e) => {
    const activeModalCard = document.querySelector(".active");
    const activeModalCardIndex = parseInt(activeModalCard.dataset.indexNumber);
    activeModalCard.classList.remove("active");
    activeModalCard.style.display = "none";
    ChangeModal(activeModalCardIndex - 1);
  });
  nextButton.addEventListener("click", (e) => {
    const activeModalCard = document.querySelector(".active");
    const activeModalCardIndex = parseInt(activeModalCard.dataset.indexNumber);
    activeModalCard.classList.remove("active");
    activeModalCard.style.display = "none";
    ChangeModal(activeModalCardIndex + 1);
  });
}