import { NextFunction, Request, Response } from "express";
import Employee, { IEmployee } from "../models/Employee";
import mongoose from 'mongoose';
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    const f_Image = req.file ? req.file.path.replace(/\\/g, "/").replace(/^.*[\\\/]uploads[\\\/]/, "uploads/") : null;



    // If the image is missing, return an error response
    if (!f_Image) {
      res.status(400).json({ error: "Image is required" });
      return; // Ensure the response ends here
    }

    // If any required fields are missing, return an error response
    if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      res.status(400).json({ error: "All fields are required" });
      return; // Ensure the response ends here
    }

    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course: Array.isArray(f_Course) ? f_Course : JSON.parse(f_Course), // Ensure it's an array if needed
      f_Image,
    });

    await newEmployee.save(); // Save the new employee

    // Send a success response
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteEmployee = async (id: string) => {
  try {
    // Convert string ID to ObjectId if needed
    const employeeId = new mongoose.Types.ObjectId(id);

    const result = await Employee.findByIdAndDelete(employeeId);

    if (!result) {
      throw new Error('Employee not found');
    }

    return result;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw new Error('Error deleting employee');
  }
};
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    const updatedData = req.body;

    const employee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.json(employee);
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Get the ID from the route parameter

    // Check if the ID is valid
    if (!id) {
      res.status(400).json({ message: "Employee ID is required" });
      return;
    }

    // Find the employee by ID
    const employee = await Employee.findById(id);

    // If the employee doesn't exist, return a 404 error
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Return the employee data
    res.status(200).json(employee);
  } catch (err: any) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ message: "Error fetching employee", error: err.message });
  }
};