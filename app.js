const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // middleware to see in console.log information on what requests are made
}

app.use(express.json()); // middleware - modifys incoming request data. Here data from the body is added to the request object

// Middleware function to say hello - for fun
app.use((req, res, next) => {
  // By adding next function, im telling express that this is going to be a middleware
  console.log('Hello from the middleware');
  next(); // Adding next() and calling it by using () at the end is crucial to complete req, res cycle
});

// Middleware function to console.log the time when a request is being made
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// ROUTING now moved to seperate file/folder

// HANDLER(controller) FUNCTIONS now moved to seperate file/folder

// ROUTES now moved to seperate file/folder below is route starting points

app.use('/api/v1/tours', tourRouter); // Mounting a router (tourRouter) on a route /api/v1/tours
app.use('/api/v1/users', userRouter);

// OLD VERSION FOR ROUTING - LEAVE FOR REFERENCE
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

module.exports = app;
