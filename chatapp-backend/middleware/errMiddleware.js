/**
 * Middleware for handling errors in the application.
 * Logs the error and sends a generic message to the client.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);

    // Determine the status code: If the error has a defined status, use it. Otherwise, default to 500.
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        message: statusCode === 500 ? 'Internal Server Error' : err.message,
        // Include stack trace in development environment only
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorMiddleware;
