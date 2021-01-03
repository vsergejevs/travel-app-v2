const User = require('./../models/userModel'); // importing the tourModel.js
const catchAsync = require('./../utils/catchAsync');


// HANDLER(controller) FUNCTIONS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
    }
  });
});

exports.createUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};

exports.getUser = (req, res) => {
  // (req, res) - route handler function
  // res.status(500).json({
  //   status: 'error',
  //   message: 'This route is note yet defined',
  // });

  console.log(req.params);

  const id = req.params.id * 1; // convert string to number

  // if the URL parameter exceeds the amount of tour objects in json or in database
  if (id > localUsers.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const user = localUsers.find((el) => el.id === id); // js find method to search inside array. Here searching for element with specified id in the url parameter

  res.status(200).json({
    status: 'success',
    results: localUsers.length,
    data: {
      users: user, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
};

exports.updateUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};

exports.deleteUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};
