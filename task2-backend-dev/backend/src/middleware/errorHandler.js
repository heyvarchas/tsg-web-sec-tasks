const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${statusCode} - ${message}`);
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;