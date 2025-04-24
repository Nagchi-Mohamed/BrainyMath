export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;

  if (statusCode >= 500 || process.env.NODE_ENV !== 'test') {
    console.error('[' + statusCode + '] ' + req.method + ' ' + req.originalUrl + ' - Error: ' + err.message);
    if (statusCode >= 500 || process.env.NODE_ENV === 'development') {
      console.error('ERROR STACK:', err.stack);
    }
  }

  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : err.stack,
  });
};
