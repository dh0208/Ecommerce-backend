# E-commerce Backend

This is a basic e-commerce application backend built with Node.js, using Sequelize ORM for database interactions and either PostgreSQL as the database.

## Project Structure

```
ecommerce-backend
├── src
│   ├── config
│   │   └── database.js        # Database configuration
│   ├── controllers
│   │   └── index.js           # Controllers for handling requests
│   ├── daos
│   │   └── index.js           # Data Access Objects for database interactions
│   ├── middlewares
│   │   ├── authMiddleware.js   # Middleware for authentication
│   │   └── errorHandler.js     # Middleware for error handling
│   ├── models
│   │   └── index.js           # Sequelize models
│   ├── routes
│   │   └── index.js           # API routes
│   ├── services
│   │   └── index.js           # Business logic services
│   ├── utils
│   │   └── statusCodes.js      # HTTP status codes
│   └── app.js                 # Entry point of the application
├── package.json                # NPM configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd Ecommerce-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   yarn
   ```

3. **Configure the database:**
   - Create a `.env` file in the root directory and add your database credentials:
     ```
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     DB_DIALECT=postgres
     ```

4. **Run the application:**
   ```
   npm start
   yarn dev
   ```

## API Usage

- The API endpoints are defined in the `src/routes/index.js` file and are handled by the respective controllers.
- Use tools like Postman or curl to interact with the API.

## License

This project is licensed under the MIT License.