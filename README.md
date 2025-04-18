# Express User Registration System

A simple and elegant user registration and login system built with Express.js and Bootstrap 5.3, featuring client-side validation and a modern UI.

## Features

- Clean and responsive Bootstrap 5.3 UI
- Tab-based registration and login forms
- Client-side form validation
- Modern gradient design
- Interactive form elements with icons
- Password strength validation
- Terms and conditions agreement
- Remember me functionality
- Password recovery option

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Modern web browser

## Setup Instructions

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/PasinduOG/express-user-registration.git

# Navigate to project directory
cd express-user-registration

# Install dependencies
npm install express body-parser dotenv
```

### 2. Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=user_registration
DB_PORT=3306

# Server Configuration
PORT=3000
```

> **Important**: Replace the placeholder values with your actual database credentials. Never commit the `.env` file with real credentials to version control.

### 3. Database Setup

1. Ensure you have MySQL installed and running
2. Create a database named `user_registration`
3. The application will automatically create the required tables on first run

### 4. Database Schema

You can use the following SQL script to set up your database:

```sql
CREATE DATABASE IF NOT EXISTS `user_registration`;
USE `user_registration`;

-- Dumping structure for table user_registration.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### 5. Running the Application (Use only one if you want)

```bash
# Start the server
npm start

# Start the auto-restarting server (nodemon)
npm run dev
```

Access the application at `http://localhost:3000`

## Project Structure

```
express-user-registration/
├── public/
│   └── index.html       # Main frontend interface
├── server.js           # Express server setup
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## Implementation Details

### Frontend
- Bootstrap 5.3 for UI components
- Bootstrap Icons for form elements
- Client-side JavaScript validation
- Responsive design for all devices

### Validation Features
- Full name validation
- Email format checking
- Password strength requirements
- Password matching verification
- Terms agreement requirement

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Pasindu OG Dev

## Acknowledgments

- Bootstrap for the amazing UI components
- Express.js community
- Node.js community
