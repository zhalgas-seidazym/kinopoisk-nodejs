# Kinopoisk Clone API

This repository contains the source code for a **Kinopoisk Clone API** developed using Node.js. The project simulates core functionalities of a movie database platform, including user management, movie details, and ratings.

---

## Features

- **Movie Management**:
  - Add, update, and delete movie records.
  - Retrieve movie details by title, genre, or year.

- **User Management**:
  - User registration and login.
  - Secure authentication using JWT.

- **Ratings and Reviews**:
  - Submit and retrieve movie ratings and reviews.
  - Calculate average ratings for movies.

- **Search Functionality**:
  - Search for movies by title, genre, or actor.

---

## Technologies Used

- **Node.js**: Server-side runtime.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing movie and user data.
- **JWT**: For secure authentication.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **dotenv**: For environment variable management.

---

## Prerequisites

Ensure you have the following installed on your system:

1. **Node.js**: Version 14 or higher.
2. **MongoDB**: For database management.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/zhalgas-seidazym/kinopoisk-nodejs.git
   cd kinopoisk-nodejs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/kinopoisk
     JWT_SECRET=your_secret_key
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:5000`.

---

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user.

### Movie Routes

- `GET /api/movies`: Get a list of movies.
- `GET /api/movies/:id`: Get details of a specific movie.
- `POST /api/movies`: Add a new movie (Admin only).
- `PUT /api/movies/:id`: Update movie details (Admin only).
- `DELETE /api/movies/:id`: Delete a movie (Admin only).

### Ratings and Reviews

- `POST /api/movies/:id/reviews`: Submit a review for a movie.
- `GET /api/movies/:id/reviews`: Get reviews for a movie.

---

## Project Structure

```plaintext
src/
├── controllers/   # Business logic for handling requests
├── models/        # Mongoose models for MongoDB
├── routes/        # Route definitions for the API
├── middlewares/   # Custom middleware for authentication and error handling
├── config/        # Database and server configuration
└── utils/         # Helper functions and utilities
```

---

## Contribution Guidelines

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

Special thanks to the contributors and maintainers of this project.

---

## Contact

For any queries or issues, please contact [Zhalgas Seidazym](https://github.com/zhalgas-seidazym).
