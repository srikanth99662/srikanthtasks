// index.js

const express = require('express');
const logger = require('./logger');
const app = express();
const port = 3015;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route that triggers an error
app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong!');
  next(err); // Passes the error to the error handling middleware
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}/`);
});

