// Import everything from auth.service into this
const authService = require('./auth.service');

// An async controller function to register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await authService.register(name, email, password, role);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Another one to login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };