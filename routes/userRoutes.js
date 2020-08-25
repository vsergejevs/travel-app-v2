const express = require('express');
const fs = require('fs'); // filesystem

const localUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

// HANDLER(controller) FUNCTIONS
const getAllUsers = (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    results: localUsers.length,
    data: {
      users: localUsers, // in ES6 if a key and value has the same name, only one can be specified
    },
  });
};

const createUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};

const getUser = (req, res) => {
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

const updateUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};

const deleteUser = (req, res) => {
  // (req, res) - route handler function
  res.status(500).json({
    status: 'error',
    message: 'This route is note yet defined',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
