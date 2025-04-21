import path from 'path';

// backend/middleware/errorMiddleware.js

// Handles routes that are not found
const notFound = (req, res, next) => {
  // Ignore requests for static assets (files with extensions)
  if (path.extname(req.originalUrl)) {
    // Let express.static handle this or just send 404 without error
    res.status(404).end();
    return;
  }
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass error to the next middleware (our error handler)
};

// General error handler
const errorHandler = (err, req, res, next) => {
  // Sometimes errors come with a status code, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  console.error('ERROR STACK:', err.stack); // Log the error stack for debugging

  res.json({
    success: false,
    message: err.message,
    // Optionally include stack trace in development environment only
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
