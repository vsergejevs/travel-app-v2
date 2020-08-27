// SERVER
const dotenv = require('dotenv'); // requiring dotenv package to read from config.env file
dotenv.config({ path: './config.env' }); // letting node know where env variables are

const app = require('./app');

console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
