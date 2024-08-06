// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = []; // This will serve as an in-memory user store for simplicity. In a real application, use a database.

const secretKey = 'your_secret_key'; // Use a secure and secret key in production

// Register a new user
function register(username, password) {
  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { username, password: hashedPassword };

  // Store user in the "database"
  users.push(newUser);
  return newUser;
}

// Login a user
function login(username, password) {
  // Find the user
  const user = users.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: '1h', // Token expires in 1 hour
  });

  return token;
}

// Middleware to verify the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }

    // Save user information to request
    req.user = decoded;
    next();
  });
}

module.exports = {
  register,
  login,
  authenticateToken,
};
