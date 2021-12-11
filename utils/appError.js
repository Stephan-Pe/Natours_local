class AppError extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);

    // this.message = message;
    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith('4') ? 'failed request' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
