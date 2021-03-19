const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// Setting html template engine
app.set('view engine', 'pug');

// Pug templates are called views
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES

// Serving static files - css, images.
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
// app.use(helmet());
app.use(

  helmet.contentSecurityPolicy({

    directives: {

      defaultSrc: ["'self'", 'data:', 'blob:'],

      baseUri: ["'self'"],

      fontSrc: ["'self'", 'https:', 'data:'],

      scriptSrc: ["'self'", 'https://*.cloudflare.com'],

      scriptSrc: ["'self'", 'https://*.stripe.com'],

      scriptSrc: ["'self'", 'http:', 'https://*.mapbox.com', 'data:'],

      frameSrc: ["'self'", 'https://*.stripe.com'],

      objectSrc: ["'none'"],

      styleSrc: ["'self'", 'https:', 'unsafe-inline'],

      workerSrc: ["'self'", 'data:', 'blob:'],

      childSrc: ["'self'", 'blob:'],

      imgSrc: ["'self'", 'data:', 'blob:'],

      connectSrc: ["'self'", 'blob:', 'https://*.mapbox.com'],

      upgradeInsecureRequests: []

    }

  })

);


// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // middleware to see in console.log information on what requests are made
}

// Limits amount of requests from one IP, currently set to 100 per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too manu requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' })); // middleware - modifys incoming request data. Here data from the body is added to the request object

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Middleware function to say hello - for fun
app.use((req, res, next) => {
  // By adding next function, im telling express that this is going to be a middleware
  console.log('Hello from the middleware This log lives in app.js');
  next(); // Adding next() and calling it by using () at the end is crucial to complete req, res cycle
});

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Middleware function to console.log the time when a request is being made
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime + ' This log lives in app.js');
  //console.log(req.headers);
  next();
});

// ROUTES now moved to seperate file/folder below is route starting points

// API routes
app.use('/', viewRouter); // Mounting a router (tourRouter) on a route /api/v1/tours
app.use('/api/v1/tours', tourRouter); // Mounting a router (tourRouter) on a route /api/v1/tours
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Handling unhandled routes is the very last route handler middleware to be executed
// if all previous routes did not match the request
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
