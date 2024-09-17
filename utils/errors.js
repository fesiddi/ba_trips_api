class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class ExistingUserError extends AppError {
  constructor(message = 'User already exists') {
    super(message, 409);
  }
}

class ExistingTripError extends AppError {
  constructor(message = 'Trip already exists') {
    super(message, 409);
  }
}

class ExternalApiError extends AppError {
  constructor(message = 'Error fetching data from 3rd party API') {
    super(message, 500);
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ExistingUserError,
  ExistingTripError,
  ExternalApiError,
};
