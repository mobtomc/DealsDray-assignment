import { Request, Response, NextFunction } from "express";

export const validateEmployeeData = (req: Request, res: Response, next: NextFunction): void => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
    // Instead of returning a response, just handle the error and move on
    res.status(400).json({ error: "All fields are required" });
    return;  // Ensure no further execution
  }

  next(); // Pass control to the next middleware
};
