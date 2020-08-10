const fs = require('fs'); // filesystem
const express = require('express');
const app = express();

app.use(express.json()); // middleware - modifys incoming request data. Here data from the body is added to the request object

const offlineTours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const localUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// ROUTING

// HANDLER FUNCTIONS
const getAllTours = (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    results: offlineTours.length,
    data: {
      tours: offlineTours, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);

  const newId = offlineTours[offlineTours.length - 1].id + 1; // generate new id as a next number of last tour object id
  const newTour = Object.assign({ id: newId }, req.body); // creates a new tour object

  offlineTours.push(newTour); // push newly created tour to offlineTours array

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(offlineTours),
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
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // convert string to number

  // if the URL parameter exceeds the amount of tour objects in json or in database
  if (id > offlineTours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = offlineTours.find((el) => el.id === id); // js find method to search inside array. Here searching for element with specified id in the url parameter

  res.status(200).json({
    status: 'success',
    results: offlineTours.length,
    data: {
      tours: tour, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > offlineTours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > offlineTours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    //  204 - no content
    status: 'success',
    data: null,
  });
};

const getUsers = (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    results: localUsers.length,
    data: {
      users: localUsers, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
};

// ROUTES
// New version with chaining requests to route
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
app.route('/api/v1/users').get(getUsers);

// Old version
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);

// Dummy PATCH request just to show how it should be done
// app.patch('/api/v1/tours/:id', updateTour);

// Dummy DELETE request just to show how it should be done
// app.delete('/api/v1/tours/:id', deleteTour);

// app.get('/api/v1/users', getUsers);

// FIRST DRAFT of GET request, not needed anymore
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
