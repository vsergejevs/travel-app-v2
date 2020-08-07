const fs = require('fs'); // filesystem
const express = require('express');

const app = express();

const localTours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const localUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// ROUTING

app.get('/api/v1/tours', (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    results: localTours.length,
    data: {
      tours: localTours, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
});

app.get('/api/v1/users', (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    results: localUsers.length,
    data: {
      users: localUsers, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
});

// app.get('/', (req, res) => {
//   // req and res are objects
//   // res.status(200).send('Hello World');   // res is an object    status() is a method     send() is a method
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' }); // another way to respond to get request by using json. json sends an object.
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint/URL now');
// });

// SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
