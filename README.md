

# DealsDray Assignment

## Project Overview

The **DealsDray Assignment** is a web-based application built using the **MERN stack** (MongoDB, Express, React, Node.js) to manage employees and their related data. The application provides functionalities such as creating, editing, and displaying employee details, allowing users to interact with both frontend and backend components seamlessly. 

The project includes the ability to:
- **Create** and **edit employee records**.
- **Upload employee images**.
- **Register users** and handle **authentication** through a backend signup script.

This application is designed to help businesses manage their employee information efficiently while providing a responsive user interface for interacting with the data.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [How to Create a Backend Signup Script](#how-to-create-a-backend-signup-script)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Axios for HTTP requests
  - React Hooks (useState, useEffect)
  
- **Backend**:
  - Node.js with Express.js
  - MongoDB
  - Mongoose for data modeling
  - JWT Authentication

## Features

- **Employee Management**:
  - Create and edit employee profiles.
  - Add employee details such as name, email, phone number, and designation.
  - Upload employee images and link them to the profiles.
  - Assign employees to courses (MCA, BCA, BSc).

- **User Authentication**:
  - A backend signup script to handle user registrations and ensure secure access to the system.

- **Responsive UI**:
  - User-friendly interface built with React and styled using Tailwind CSS, ensuring a smooth user experience on both desktop and mobile devices.

## Installation

To get started with this project, follow the steps below:

### Frontend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mobtomc/DealsDray-assignment.git
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd DealsDray-assignment/frontend
   ```

3. **Install the dependencies**:
   Make sure you have Node.js installed. If not, download it from [here](https://nodejs.org/).

   Run the following command to install all the necessary packages:
   ```bash
   npm install
   ```

4. **Run the React development server**:
   ```bash
   npm start
   ```

   This will start the frontend application on `http://localhost:3000`.

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd DealsDray-assignment/backend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the backend folder and add the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Replace `your_mongodb_connection_string` with the actual MongoDB connection URI and `your_jwt_secret_key` with a secret key for JWT authentication.

4. **Run the backend server**:
   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:5000`.

### Running the Project

Once both the backend and frontend servers are running, navigate to `http://localhost:3000` in your browser to access the application.

The frontend will communicate with the backend API to handle employee records and user authentication.

## API Documentation

### Endpoint: **POST /api/employees**

- **Description**: Adds a new employee to the database.
- **Request Body**:
  ```json
  {
    "f_Name": "John Doe",
    "f_Email": "john.doe@example.com",
    "f_Mobile": "1234567890",
    "f_Designation": "Manager",
    "f_gender": "Male",
    "f_Course": ["MCA", "BCA"],
    "f_Image": "file.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Employee created successfully",
    "employee": { ...employeeData }
  }
  ```

### Endpoint: **POST /api/auth/signup**

- **Description**: Creates a new user for authentication (used for signup).
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123",
    "email": "admin@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "user": { ...userData }
  }
  ```

### Endpoint: **POST /api/auth/login**

- **Description**: Logs in a user and generates a JWT token for authentication.
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here"
  }
  ```

## How to Create a Backend Signup Script

To create a signup script in the backend:

1. **Create the User Model**:
   In `backend/models/User.js`, define the Mongoose model for a user.

   ```js
   const mongoose = require("mongoose");
   const bcrypt = require("bcryptjs");

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
   });

   userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
   });

   userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
   };

   const User = mongoose.model("User", userSchema);
   module.exports = User;
   ```

2. **Create the Signup Route**:
   In `backend/routes/authRoutes.js`, add the route to handle user registration.

   ```js
   const express = require("express");
   const User = require("../models/User");
   const bcrypt = require("bcryptjs");

   const router = express.Router();

   // Signup Route
   router.post("/signup", async (req, res) => {
     const { username, email, password } = req.body;

     try {
       const userExists = await User.findOne({ username });
       if (userExists) return res.status(400).json({ message: "User already exists" });

       const user = new User({ username, email, password });
       await user.save();
       res.status(201).json({ message: "User created successfully", user });
     } catch (error) {
       res.status(500).json({ message: "Server error" });
     }
   });

   module.exports = router;
   ```

3. **Integrate the Route in your Server**:
   In `backend/server.js`, add the route:

   ```js
   const authRoutes = require("./routes/authRoutes");

   app.use("/api/auth", authRoutes);
   ```

4. **Test the Signup Endpoint**:
   You can now use tools like Postman or Insomnia to test the signup functionality by sending a `POST` request to `/api/auth/signup`.

## Contributing

We welcome contributions to enhance the project! To contribute:

1. Fork this repository.
2. Clone your fork locally.
3. Create a new branch for your feature or bug fix.
4. Commit your changes and push to your fork.
5. Open a pull request to the main repository.
