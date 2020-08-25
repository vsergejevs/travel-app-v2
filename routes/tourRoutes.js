const express = require('express');
const fs = require('fs'); // filesystem

const offlineTours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// HANDLER(controller) FUNCTIONS
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

const getAllTours = (req, res) => {
  // (req, res) - route handler function
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: offlineTours.length,
    data: {
      tours: offlineTours, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
    },
  });
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

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
