// SERVER
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // requiring dotenv package to read from config.env file

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...!')
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' }); // letting node know where env variables are
const app = require('./app');

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
    console.log('DB connection successful! This log lives in server.js');
  });

//console.log(process.env); // this will show all the processes running and also the environmental variables

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}. This log lives in server.js`);
});
// console.log(x);
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...!')
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});