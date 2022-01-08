/**
 * Team Treehouse Project 5 - This project fetches data from the
 * random user API generator and displays information about each
 * on an "employee" directory page.
 *
 * Clicking on an employee will generate a modal window displaying
 * more information about that employee.
 *
 * Search filter functionality has also been added.
 */

const url = "https://randomuser.me/api/?nat=us&results=12";
const gallery = document.getElementById("gallery");
const employeeArray = [];

getUserData(url);

/**
 * Function that fetches data from Random User API then calls other
 * functions to setup the initial data needed and create the card divs
 *
 * @param {string} url - Url of Random User API
 */

function getUserData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => createEmployeeArray(data))
    .then(() => createCards(employeeArray))
    .catch((error) => console.log(error));
}

/**
 * Function that stores data's results
 * in an array to be used by other functions
 *
 * @param {response} data - response from a fetch URL
 */
function createEmployeeArray(data) {
  data.results.forEach((employee) => {
    employeeArray.push(employee);
  });
}


/**
 * Creates a card div for each employee
 *
 * @param { array} arrayOfEmployees
 */
function createCards(arrayOfEmployees) {
  gallery.innerHTML = "";
  arrayOfEmployees.forEach((employee, index) => {
    const cardHTML = `
    <div class="card" data-index-number = "${index}">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city} ${employee.location.state}</p>
      </div>
    </div>`;
    gallery.insertAdjacentHTML("beforeend", cardHTML);
  });
  const employees = Array.from(gallery.children);
  employees.forEach((employee) => {
    employee.addEventListener("click", (e) => {
      createModal(employeeArray, employee.dataset.indexNumber);
    });
  });
}

/**
 * When called by the event listener in createCards a modal window is created then calls the showModal function
 *
 * @param {array} arrayOfEmployees - Array to create from
 * @param {num} index - Index of employee
 */
function createModal(arrayOfEmployees, index) {

  const employeeModalData = arrayOfEmployees[index];
  dob = new Date(employeeModalData.dob.date).toLocaleDateString();

  const modalHTML = `
    <div class="modal-container">
      <div class="modal" data-modal-index-number = "${index}">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${employeeModalData.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${employeeModalData.name.first} ${employeeModalData.name.last}</h3>
              <p class="modal-text">${employeeModalData.email}</p>
              <p class="modal-text cap">${employeeModalData.location.city} ${employeeModalData.location.state}</p>
              <hr>
              <p class="modal-text">${employeeModalData.phone}</p>
              <p class="modal-text">${employeeModalData.location.street.number} ${employeeModalData.location.street.name} ${employeeModalData.location.city}
                  ${employeeModalData.location.state} ${employeeModalData.location.postcode} ${employeeModalData.location.country}</p>
              <p class="modal-text">${dob} </p>
          </div>
          <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`;
  gallery.insertAdjacentHTML("afterend", modalHTML);
  showModal(arrayOfEmployees, index);
}

/**
 *
 * @param {array} arrayOfEmployees
 * @param {num} index
 */

function showModal(arrayOfEmployees, index) {

  const modal = document.querySelector(
    `[data-modal-index-number = '${index}']`
  );
  const closeButton = modal.querySelector(".modal-close-btn");
  const modalContainer = modal.parentElement;
  modalContainer.style.display = "block";

  closeButton.addEventListener("click", (e) => {
    modalContainer.style.display = "none";
    modalContainer.remove();
  });

  const prevButton = document.getElementById("modal-prev");
  const nextButton = document.getElementById("modal-next");

  prevButton.addEventListener("click", (e) => {
    modalContainer.remove();
    index--;
    if (index < 0) index = arrayOfEmployees.length - 1;
    createModal(arrayOfEmployees, index);
  });

  nextButton.addEventListener("click", (e) => {
    modalContainer.remove();
    index++;
    if (index > arrayOfEmployees.length - 1) index = 0;
    createModal(arrayOfEmployees, index);
  });
}


/**
 * Variables for search functionality and creation of elements
 */

const searchContainer = document.querySelector('.search-container');
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

searchContainer.insertAdjacentHTML('beforeend', searchHTML);
const searchInput = document.getElementById('search-input');

/**
 * Event listener for the search function
 */

searchInput.addEventListener('keyup', (e) => {
  search(e.target.value);
})

/**
 * This function filters results displayed on the page.
 * @param {string} input - Input text from user's search
 */

function search(input) {
  const cards = Array.from(gallery.children);
  const newArray = [];
  cards.forEach((card,index) => {
    if (input.length != 0 && (card.querySelector('h3').innerText.toLowerCase().includes(input.toLowerCase()))) {
      card.style.display = 'block';

    } else {
      card.style.display = 'none';
    }
  })
  if (input.length === 0) {
    cards.forEach(card => {
      card.style.display = 'block';
    })
  }
}