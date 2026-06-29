// This file basically is to handle errors, so I make a function to handle it
// General middlewares look like (req, res, next) but since i'm dealing with errors I'll use an extra parameter
const errorHandler = (err, req, res, next) => {
    // Check if the status code is there, and if not, default to 500
    const statusCode = err.statusCode || 500;
    // If error message is there use that, otherwise default (corresponding to 500)
    const message = err.message || 'Internal Server Error';

    // Now I check if it's running in production
    // If it isn't, then I can safely display the error
    if (process.env.NODE_ENV !== 'production') {
        console.error(`[ERROR] ${statusCode} - ${message}`);
        console.error(err.stack);
    }

    // Then send back a json response with success status and error message
    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;