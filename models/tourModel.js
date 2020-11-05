const mongoose = require('mongoose');
const slugify = require('slugify');

// Mongoose schema
// Fat model thin controller concept
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40,'A tour name must have less or equal than 40 characters'],
    minlength: [10,'A tour name must have more or equal than 10 characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    },
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must not be above 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  }
},
// Virtual properties object with schema options
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Mongoose Virtual property function
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// Mongoose document middleware which creates a slug: runs before .save() and .create() 
// AKA pre save hook
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Mongoose document middleware runs before a document is saved
tourSchema.pre('save', function(next) {
  console.log('Will save document...');
  next();
});

// Mongoose document middleware which creates a slug: runs after .save() and .create()
tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});

// Mongoose Query middleware. AKA pre find hook
// tourSchema.pre('find', function(next) { - uses 'find' to find all, 
// but I use regex /^find/ so this middleware runs on findOne, findOneAndDelete, 
// etc Mongoose query middlewares so that secretTour stays hidden
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  
  this.start = Date.now();
  next();
});

// Mongoose Query middleware, AKA post find hook
tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds. This log lives in tourModel.js`)
  //console.log(docs);
  next();
})

// Mongoose Aggregation middleware
// Removing secret tours documents from output when running tour statistics route
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  
  console.log(this.pipeline());
  next();
});

// Mongoose data model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
