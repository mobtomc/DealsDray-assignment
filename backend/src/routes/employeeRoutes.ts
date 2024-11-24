// routes/employeeRoutes.ts
import express, { Request, Response } from 'express';
import multer from "../utils/multerConfig";  // Multer middleware for file upload
import { validateEmployeeData } from "../middleware/validationMiddleware"; // Validation middleware
import { createEmployee,getEmployees,deleteEmployee,updateEmployee,getEmployeeById } from "../controllers/employeeController"; // Your controller function

const router = express.Router();

// Route for employee creation
router.post(
  "/create",                // The endpoint for employee creation
  multer.single("f_Image"), // Multer middleware to handle the image upload field
  validateEmployeeData,     // Validation middleware for employee data
  createEmployee            // Controller function to handle employee creation
);
router.get("/", getEmployees);
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Get the employee ID from the route parameters
  
      // Call the deleteEmployee controller function to delete the employee
      await deleteEmployee(id);
  
      // Send a success response after deletion
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
router.put("/:id", updateEmployee); 
router.get("/:id", getEmployeeById);
export default router;
