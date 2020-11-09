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
  console.log('Hello from the middleware This log lives in app.js');
  next(); // Adding next() and calling it by using () at the end is crucial to complete req, res cycle
});

// Middleware function to console.log the time when a request is being made
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime + 'This log lives in app.js');
  next();
});

// ROUTES now moved to seperate file/folder below is route starting points

app.use('/api/v1/tours', tourRouter); // Mounting a router (tourRouter) on a route /api/v1/tours
app.use('/api/v1/users', userRouter);

// Handling unhandled routes is the very last route handler middleware to be executed
// if all previous routes did not match the request
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // })

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
