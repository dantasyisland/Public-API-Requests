import fetch from "node-fetch";
const url = "https://randomuser.me/api/?results=1";


// fetch(url)
//   .then(res => res.text())
//   .then(text => console.log(text));


const response = await fetch(url);
const data = await response.json();
const myData = data.results;
console.log(myData[0].dob.date);
const birthdate = new Date(myData[0].dob.date);

//MM/DD/YYYY
console.log(birthdate.toLocaleDateString());


const dtfUS = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}); //
console.log(dtfUS.format(birthdate));