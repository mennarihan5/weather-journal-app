// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {

	console.log('Server running');
}

//GET route to return projectData in server code
app.get('/all', getData);

function getData(req, res) {

  console.log(projectData);
  res.send(projectData);
}

//POST route to add incoming data to projectData

app.post('/add', addData);

function addData (req, res) {
console.log(req.body);

 newEntry = {
 	date: req.body.date,
 	temp: req.body.temp,
 	content: req.body.content
 }
  projectData.pop(newEntry);
  projectData.push(newEntry);
}




