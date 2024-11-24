import axios from "axios";
import { Employee } from "../types/Employee";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (userData: { f_userName: string; f_Pwd: string }) =>
  API.post("/auth/login", userData);

export const getEmployees = () => API.get<Employee[]>("/employees");

export const createEmployee = (formData: FormData) =>
  API.post("/employees/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  export const deleteEmployee = async (id: string) => {
    try {
      // Ensure the correct URL based on the backend setup
      const response = await axios.delete(`http://localhost:5000/api/employees/${id}`);
      return response.data;  // Handle the response accordingly
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
  export const getEmployeeById = (id: string) => {
    return axios.get(`/api/employees/${id}`);
  };
  
  export const updateEmployee = (id: string, updatedData: Employee) => {
    return axios.put(`/api/employees/${id}`, updatedData);
  };