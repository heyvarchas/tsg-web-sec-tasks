// rbac - Role-Based Access Control
// This file is to make sure only users with admin role can access certain routes
// Create a standard middleware first
const adminOnly = (req, res, next) => {
  // If role isn't admin, create an error object and return it
  if (req.user.role !== 'admin') {
    const err = new Error('Access denied. Admins only.');
    err.statusCode = 403;
    return next(err);
  }
  next();
};

module.exports = { adminOnly };