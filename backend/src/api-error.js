class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;

    console.error(`[ApiError] ${statusCode} - ${message}`);
  }
}

module.exports = ApiError;
