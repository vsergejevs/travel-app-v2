const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});


exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //updated doc will be returned
    runValidators: true,
  });

  if(!doc) {
    return next(new AppError('No document found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    },
  });
});


exports.createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);
  // Tour.create returns a promise that I'm awaiting and I can store the newly created document in doc variable
  // then send it with response to the client below in - tour: doc
  // if an error occurs - it is being sent back from the catchAsync error catch

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    }
  });
});