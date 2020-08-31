const Tour = require('./../models/tourModel'); // importing the tourModel.js

// HANDLER(controller) FUNCTIONS

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.getAllTours = (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: offlineTours.length,
    // data: {
    //   tours: offlineTours, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // convert string to number

  // if the URL parameter exceeds the amount of tour objects in json or in database
  // if (id > offlineTours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

  // const tour = offlineTours.find((el) => el.id === id); // js find method to search inside array. Here searching for element with specified id in the url parameter

  res.status(200).json({
    status: 'success',
    // results: offlineTours.length,
    // data: {
    //   tours: tour, // in ES6 if a key and value has the same name, only one can be specified
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    //  204 - no content
    status: 'success',
    data: null,
  });
};
