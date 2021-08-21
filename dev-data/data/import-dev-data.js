// SERVER
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // requiring dotenv package to read from config.env file
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' }); // letting node know where env variables are

// CONNECT TO DB
const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // Added this due to error msg
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('DB connection successful!');
  });

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')); // JSON.parse converts json to javascript object
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8')); // JSON.parse converts json to javascript object
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')); // JSON.parse converts json to javascript object

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//console.log(process.argv);
