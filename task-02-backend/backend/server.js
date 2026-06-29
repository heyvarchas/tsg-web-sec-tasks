// Using this file basically I intend to connect the database and start the HTTP server
// Apparently this command loads the .env file into process.env
require('dotenv').config();
// Now I'll import the app instance from app.js
const app = require('./app');
// Now I need the connect function from my database configuration file
const { connect } = require('./src/config/db');

// First check if PORT exists on .env, and if not, I'll set it to 3000 (default)
const PORT = process.env.PORT || 3000;

// Now i want to make an asynchronous function to print out a message after connecting...
const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`DIMS server running on port ${PORT}`);
  });
};

// Now I'm calling the function
start();