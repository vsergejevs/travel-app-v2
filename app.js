const express = require('express');

const app = express();

// Routing
// req and res are objects
app.get('/', (req, res) => {
  // res.status(200).send('Hello World'); // res is an object    send() is a method    status() is a method
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' }); // another way to respond to get request by using json
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
