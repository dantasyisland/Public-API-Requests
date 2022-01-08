const url = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById('gallery');
let employees = [];
let employeeArray = [];


fetchData(url);

function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => (createUserArray(res)))
    .then((res) => createCards(res.results))
    .catch((error) => console.log(error))
}

function createUserArray(res) {
  employeeArray = res.results;
  return res
}


function createCards(results) {
  employees = results;
  employees.forEach((employee, index) => {
    createCard(employee, index);
  });
};

function createCard(employee, index) {
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

  cards = gallery.children;
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
      showModal(employee, cards[i].dataset.indexNumber);
    });
  }
};


function showModal(employees, index) {

  createModal(employees, index);

  const modal = document.querySelector(`[data-modal-index-number = '${index}']`);
  const closeButton = modal.querySelector(".modal-close-btn");
  const modalContainer = modal.parentElement;

  modalContainer.style.display = 'block';

  closeButton.addEventListener("click", (e) => {
    modalContainer.style.display = 'none';
    modalContainer.remove();
  });

  const prevButton = document.getElementById('modal-prev');
  const nextButton = document.getElementById('modal-next');

  prevButton.addEventListener('click', (e) => {
    modalContainer.remove();
    index--;
    if (index < 0) index = employees.length - 1;
    showModal(employees, index);
  })

  nextButton.addEventListener('click', (e) => {
    modalContainer.remove();
    index++;
    if (index > employees.length - 1) index = 0;
    showModal(employees, index);
  })

}


function createModal(employees, index) {

  let employee = employees[index]
  dob = new Date(employee.dob.date).toLocaleDateString();

  const modalHTML = `
  <div class="modal-container">
    <div class="modal" data-modal-index-number = "${index}">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city} ${employee.location.state}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}
                ${employee.location.state} ${employee.location.postcode} ${employee.location.country}</p>
            <p class="modal-text">${dob} </p>
        </div>
        <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>`;
  gallery.insertAdjacentHTML("afterend", modalHTML);
}


const searchContainer = document.querySelector('.search-container');
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

searchContainer.insertAdjacentHTML('beforeend', searchHTML);

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', (e) => {
  search(e.target.value);
})


function search(input) {
  gallery.innerHTML = '';
  if (input === '') {
    createCards(employeeArray)
  }
  let newCards = [];
  for (let i = 0; i <= employees.length - 1; i++) {
    if (input.length != 0 && (employees[i].name.first.toLowerCase().includes(input.toLowerCase())) || employees[i].name.last.toLowerCase().includes(input.toLowerCase())) {
      newCards.push(employees[i]);
    }
  }
  createCards(newCards)
}