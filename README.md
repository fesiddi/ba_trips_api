# Trip Manager API

## Description
This project provides a Trip Manager API that allows users to save, list, and delete trips. It also integrates with a 3rd party API to display relevant results sorted accordingly.

- **Framework**: Express.js for building the RESTful API.
- **Database**: MongoDB for data storage, with Mongoose as the ODM (Object Data Modeling) library.
- **Authentication**: JSON Web Tokens (JWT) for secure authentication.
- **Validation**: Joi for input validation.
- **Security**: Helmet for setting various HTTP headers, and express-mongo-sanitize to prevent MongoDB Operator Injection.
- **Rate Limiting**: express-rate-limit to limit repeated requests to public APIs.
- **Logging**: Winston for logging requests and errors.
- **Documentation**: Swagger for API documentation.
- **Testing**: Mocha and Chai for unit and integration tests.
- **Environment Management**: dotenv for managing environment variables.
- **Containerization**: Docker for containerizing the application.
- **CI Integration**: Continuous Integration setup for automated testing and deployment.

## Features

- Search trips using a 3rd party API
- Save, list, and delete trips
- Detailed logging
- Rate limiting
- Input validation
- Swagger documentation
- Dockerized setup
- CI integration

## Installation

1. Clone the repository:
```sh
git clone git@github.com:fesiddi/ba_trips_api.git
```

2. Navigate to the project directory:
```sh
cd ba_trips_api
```

3. Install dependencies:
```sh
npm install
```

4. Create a .env file in the root directory and add the following:
```sh
PORT=3000
DB_URI=mongodb://localhost:27017/trip_manager
PROD_DB_URI=mongodb://mongo:27017/trip_manager
API_ENDPOINT=the_external_api_endpoint_previously_provided
API_KEY=the_api_key_previously_provided
JWT_SECREY=your_jwt_secret
```

## Testing

1. Run the tests:
```sh
npm test
```

## Usage

1. Build and start the app:
```sh
npm build
```

2. The API will be available at http://localhost:3000.


## Swagger Documentation

Access the Swagger UI at http://localhost:3000/api-docs to view the API documentation and try the API.


## Authentication Endpoints

1. Before starting to use the application a new user need to be registered with the following endpoint:

- `POST /api/auth/register`: Register a new user

2. Then we have to login in order to obtain the bearer token that we will use for the API endpoints:

- `POST /api/auth/login`: Login with the created user

## API Endpoints

- `GET /api/trips`: List all the user saved trips

- `POST /api/trips`: Save a trip

- `GET /api/trips/search`: Search trips using 3rd party API

- `DELETE /api/trips/:id`: Delete a trip


## License

This project is licensed under the MIT License. See the LICENSE file for details.