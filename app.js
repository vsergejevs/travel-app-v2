const express = require('express');

const app = express();

// ROUTING

app.get('/', (req, res) => {
  // req and res are objects
  // res.status(200).send('Hello World');   // res is an object    status() is a method     send() is a method
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' }); // another way to respond to get request by using json. json sends an object.
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint/URL now');
});

// SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
