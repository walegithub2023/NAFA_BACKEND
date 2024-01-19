const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Sorry we encountered server error",
  };

  res.status(customError.statusCode).json({ message: customError.message });
};

// to handle errors within our controller
class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { errorHandlerMiddleware, CustomError };
