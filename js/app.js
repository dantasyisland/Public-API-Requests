function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(res => iterate(res.results))
  .then(res => console.log(res)) // because of return results
}



fetchData('https://randomuser.me/api/?results=12')

function iterate(results) {
  results.forEach(element => {

    //For the card
    //card-img-container
    console.log(element.picture.thumbnail);

    // card-info-container
    console.log(element.name.first);
    console.log(element.name.last);
    console.log(element.email);
    console.log(element.location.city);
    console.log(element.location.state);

  });
  return results
}

