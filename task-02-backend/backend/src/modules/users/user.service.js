const User = require('../auth/auth.model');

const getAllUsers = async (query) => {
  const { page = 1, limit = 10, role } = query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (role) filter.role = role;

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

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

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