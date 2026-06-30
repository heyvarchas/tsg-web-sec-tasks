// I need to import everything exported from user.service.js
// I'll store it in the variable userService
const userService = require('./user.service');

// Now I;ve to create an asynchronous middleware function
const getAllUsers = async (req, res, next) => {
  // Calling the service layer and passing the query
  try {
    const result = await userService.getAllUsers(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// Another controller that fetches one user....
const getUserById = async (req, res, next) => {
  try {
    // Reads the url, then call a function from userService
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Another one to update existing user
const updateUser = async (req, res, next) => {
  try {
    // User id and new data are sent to the service and processed
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Need one to delete a user completely, again I'll do this using the id
const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };