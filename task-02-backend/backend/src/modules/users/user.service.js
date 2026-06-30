const User = require('../auth/auth.model');

// Function to fetch users.. extracted queries passed into this
const getAllUsers = async (query) => {
  // Object destructuring
  const { page = 1, limit = 10, role } = query;
  // Calculates how many documents mongodb should skip
  // Since default page is 1, it'll be 0 by default
  const skip = (page - 1) * limit;

  // Creating an empty filter object
  const filter = {};
  if (role) filter.role = role;

  // Promise.all() runs multiple asynchronous operations at the same time instead of one after another
  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }),
    User.countDocuments(filter),
  ]);

  return { users, total, page: parseInt(page), limit: parseInt(limit) };
};

// Getting one user data
const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

// Updating an existing user
const updateUser = async (id, data) => {
  // Prevent role or password from being updated here
  delete data.password;
  delete data.role;

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

// Deleting a user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };