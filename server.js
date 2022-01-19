'use strict';

console.log('Hello World!!!');

const { application } = require('express');
//Require used in servers instead of import
const express = require('express');

const app = express();

//Any Middleware goes after app is instantiated
const PORT = 3003;

//Core route: hit http://localhost:3003
app.get('/', (request, response) => {
  response.send('Servers Up!');
});

//surfsup route: hit http://localhost:3003/surfsup
app.get('/surfsup', (request, response) => {
  response.send('Surfs Up!');
});

//sup route: hit http://localhost:3003/sup?person=Josh
app.get('/sup', (request, response) => {
  let person = request.query.person;

  //Used for proof of life, look in terminal
  console.log(request.query);
  console.log(person);

  response.send(`Sup ${person}, Server's up!`)
});
// Throw an error: hit http://localhost:3003/throw-an-error
app.get('/throw-an-error', (request, response)=> {
  throw 'Something went really wrong!';
});

//Catch Route Always Must be the last route in file and can control the message
app.get('*', (request, response) => {
  response.status(404).send('UH OH! Something\'s Wrong!');

});
//Listener for requests
app.listen(PORT, () => console.log(`listening ${PORT}`));
