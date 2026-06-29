// Import mongoose in as usual
const mongoose = require('mongoose');

// Then I'm creating an async function to connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
// So yeah if there's an error also it's covered here, and it exists the process because you can't do anything without the database

module.exports = { connect };