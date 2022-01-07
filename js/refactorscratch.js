const url = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById('gallery');
let employees = [];

//CREATE HTML FOR THIS
const modalContainer = document.createElement("div");
modalContainer.className = "modal-container";
gallery.insertAdjacentElement("afterend", modalContainer);

fetchData(url);


function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => createCards(res.results))
    .catch((error) => console.log(error))
}

function createCards(results) {
  let index = 0;
  employees = results;
  results.forEach((element, index) => {
    const cardHTML = `
      <div class="card" data-index-number = "${index}">
        <div class="card-img-container">
          <img class="card-img" src="${element.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
          <p class="card-text">${element.email}</p>
          <p class="card-text cap">${element.location.city} ${element.location.state}</p>
        </div>
      </div>`;
    gallery.insertAdjacentHTML("beforeend", cardHTML);
  });

  cards = gallery.children;
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", (e) => {
      showModal(cards[i], cards[i].dataset.indexNumber);
    });
  }


};


function showModal(card, index) {
  console.log(card);
  console.log(index);
}