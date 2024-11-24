import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';  // Import the User model from the `models` directory

// Load environment variables from .env file
dotenv.config();

// Function to connect to the database


const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');  // This will log once the connection is successful
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export default connectDB;


// Function to add a user
const addUser = async () => {
  const username = 'admin';  // Replace with your desired username
  const password = 'admin123';  // Replace with your desired password

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    f_userName: username,
    f_Pwd: hashedPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();
    console.log('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Run the script
const run = async () => {
  await connectDB();  // Connect to the database
  await addUser();     // Add user
};

run();
