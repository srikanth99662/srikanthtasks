const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Basic routenpm install
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // Route with URL parameter
app.get('/users/:id', (req, res) => {
    const userObj = {
      id: 10,
      name: "srikanth",
      lastName: "pazzuri",
      status: true
    };
    res.send(userObj);
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
  });
// POST route
app.post('/users', (req, res) => {
    const newUser = req.body;
    // Simulate adding the user to the database
    res.status(201).send(`User created: ${JSON.stringify(newUser)}`);
  });
// DELETE route for deleting a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Simulate deleting the user from the database
    res.send(`User ${userId} deleted`);
  });
// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send('404: Not Found');
  });
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
          