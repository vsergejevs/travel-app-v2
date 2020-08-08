const fs = require('fs'); // filesystem
const express = require('express');
const app = express();

app.use(express.json()); // middleware - modifys incoming request data. Here data from the body is added to the request object

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
      tours: localTours, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
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

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = localTours[localTours.length - 1].id + 1; // generate new id as a next number of last tour object id
  const newTour = Object.assign({ id: newId }, req.body); // creates a new tour object

  localTours.push(newTour); // push newly created tour to localTours array

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(localTours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  //res.send('Done'); //  always have to send something to finish request response cycle
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
