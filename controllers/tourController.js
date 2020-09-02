const Tour = require('./../models/tourModel'); // importing the tourModel.js

// HANDLER(controller) FUNCTIONS

exports.createTour = async (req, res) => {
  try {
    // use try-catch when using an async await function

    const newTour = await Tour.create(req.body);
    // Tour.create returns a promise that I'm awaiting and I can store the newly created document in newTour variable
    // then send it with response to the client below in - tour: newTour
    // if an error occurs - it is being sent back below in catch block

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllTours = async (req, res) => {
  // (req, res) - route handler function
  try {
    // create a hard copy of the req.query object using destructuring
    // it contains all the requested tours from the server
    const queryObj = { ...req.query };

    // define query fields that will be removed if they appear in the querystring
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // delete query fields from the queryObj object before searching for querystrings
    excludedFields.forEach((el) => delete queryObj[el]);

    // search for all tours in the queryObj instead of req.query and save it to query variable
    const query = Tour.find(queryObj);

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour, // in ES6 if a key and value has the same name, only one can be specified e.g. tours: tours
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  console.log('URL arameter here is:');
  console.log(req.params);
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //updated document will be returned
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
