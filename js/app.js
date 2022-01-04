function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => createCards(res.results)) // results returned -- have it return cards
    .then((res) => createModals(res))
    .then((res) => printArray(res))
    .then((res) => addCards(res))
    .then();
  // because of return results
}

fetchData("https://randomuser.me/api/?results=12");

function createCards(results) {
  results.forEach((element) => {
    const cardHTML = `
      <div class="card">
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
  return results;
}

function createModals(results) {
  results.forEach((element) => {
    const modalHTML = `
      <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${element.picture.medium}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${element.name.first} ${element.name.last}</h3>
              <p class="modal-text">${element.email}</p>
              <p class="modal-text cap">${element.location.city} ${element.location.state}</p>
              <hr>
              <p class="modal-text">(555) 555-5555</p>
              <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
      </div>`;
    gallery.insertAdjacentHTML("beforeend", modalHTML);
  });
  return results;
}

// Gotta get the name out


// create add event listener - pass func?
function addCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    // console.log(cards[i]);
    cards[i].addEventListener("click", (e) => {
      kickOutWhatINeed(cards[i]);
    });
  }
}

function printArray(results) {
  // console.log(results);
  const cards = document.getElementById("gallery").children;
  return cards;
}

// iterate through modal - match email to email

function kickOutWhatINeed(card) {
  console.log(card);
}

// gallery.addEventListener("click", (e) => {
//   if ((e.target.parentNode.nodeName) === 'DIV') {
//     console.log(e.target.parentNode);

//   }; //

// });

/**
 * Modal Code - build this function and have fetch pass it for now - get the button working - gotta get one out of here
 */

function createModal(results) {
  const modalHTML = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
        </div>`;
}