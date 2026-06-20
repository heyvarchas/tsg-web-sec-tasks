const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    const err = new Error('Access denied. Admins only.');
    err.statusCode = 403;
    return next(err);
  }
  next();
};

module.exports = { adminOnly };