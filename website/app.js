/* Global Variables */
let date = document.getElementById('date').value;
let temp = document.getElementById('temp').value;
let content = document.getElementById('content').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//baseURL & apiKey
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2d09e8c46bb33a76482f8b012090b264&units=metric';

//event listener when user clicks generate button
const button = document.getElementById('generate');
button.addEventListener('click', performAction);

//event listener function
function performAction(event) {
  let zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  getData(baseURL, zip, apiKey)
    .then(function (data) {
	  console.log(data);
	  postData('/add', {date: newDate, temp: data.main.temp, content: feelings});
	  updateUI();
})
};

//function to fetch api data
const getData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey)

  try {
  	const data = await res.json();
  	return data;
  	console.log(data);
  }catch(error) {
  	console.log("error", error);
  }
}

// user input post data function
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
  	const newData = await response.json();
  }catch (error) {
  	console.log("error", error);
  }
};

//updating UI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `Feelings: ${allData[0].content}`;

  }catch(error){
    console.log("error", error);
  }
}










