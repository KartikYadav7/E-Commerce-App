# E-Commerce App

## Overview

This project implements a simple sign-up and login flow for an e-commerce website where users can select categories they are interested in. 
## Features

- **User Registration**
  - Two-step new user registration.
- **User Login**
  - Existing users can log in with their credentials
- **Protected Page**
  - Displays categories fetched from the database
  - Allows users to mark categories of interest
  - Implements pagination with 6 categories per page
  - Persists user-selected categories across sessions
- **Common Header**
  - The Header is a reusable react component that can be used on all pages depending upon the choice. 

## Screens

1. **Registration Screen 1**: User enters basic information (e.g., email, password).
2. **Registration Screen 2**: Code Verification sent on Email.
3. **Login Screen**: Existing users can log in.
4. **Protected Page**: Only accessible after login, displays categories with pagination and selection functionality.

## Technical Details

### Frontend

- React.js for building UI components.
- React Router for page navigation.
- State management with React hooks.
- Pagination implemented for category display (6 categories per page).
- Selected categories persist via API and local storage/session management.

### Backend

- Node.js and Express.js for REST API.
- MongoDB for user and category data persistence.
- User authentication with JWT or sessions.
- API endpoints:
  - User registration
  - User login
  - Fetch categories (paginated)
  - Update user interests (selected categories)

### Database

- MongoDB collection for **Categories** with 100 entries.
- Categories are seeded using **faker.js** to generate realistic fake category names.
- MongoDB collection for **Users** with stored selected categories.

## Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/KartikYadav7/E-Commerce-App.git
   cd Revispy

2. Install backend Dependencies:

   ```bash
   cd backend
   npm install

3. Install Frontend Dependencies:

   ```bash
   cd ../frontend
   npm install

 4.Configure Environment Variables in your Backend:

  ```bash
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    PORT=5000
    EMAIL_USER =<Your Email>
    EMAIL_PASS = <Your Email APP Password>
```

5.Seed the database with 100 categories using faker.js:

```bash
  cd ../backend
  node seedCategories.js
```

6.Start the backend server:

```bash
npm run start
```

7.Start the frontend development server:

```bash
cd ../frontend
npm run dev
```

8.Open your browser and navigate to:

```bash
https://localhost:5173
```

## Note:-

SignUP with an existing email, a verification code will be sent to for verification. 



