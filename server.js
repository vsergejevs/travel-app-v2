// SERVER
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // requiring dotenv package to read from config.env file
const app = require('./app');

dotenv.config({ path: './config.env' }); // letting node know where env variables are

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

//console.log(process.env); // this will show all the processes running and also the environmental variables

// Mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Mongoose data model
const Tour = Mongoose.model('Tour', tourSchema);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
