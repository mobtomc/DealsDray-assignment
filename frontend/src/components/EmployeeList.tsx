import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { Employee } from "../types/Employee";
import { useNavigate } from "react-router-dom";

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    };
    fetchData();
  }, []);

  // Handle search filter
  const handleSearch = () => {
    const filtered = employees.filter((employee) => {
      return (
        employee.f_Name.toLowerCase().includes(searchKeyword.toLowerCase()) || // Search by Name
        employee.f_Mobile.includes(searchKeyword) || // Search by Mobile
        employee.f_Designation.toLowerCase().includes(searchKeyword.toLowerCase()) // Search by Designation
      );
    });
    setFilteredEmployees(filtered);
  };

  // Handle deletion of an employee
  const handleDelete = async (id: string) => {
    try {
      // Make API call to delete the employee
      await deleteEmployee(id);
  
      // Update the state to remove the employee from the list
      const updatedEmployees = employees.filter((employee) => employee._id !== id);
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit employee with ID:", id);
    // Redirect to the EditEmployee page with the employee ID in the URL
    navigate(`/edit-employee/${id}`);
  };

  return (
    <div className="p-6 bg-[#FFF4B7]">
      <div className="flex justify-between mb-6">
        <div className="text-xl font-bold text-[#000B58]">Employee List</div>
        <div className="flex space-x-4">
          <button
            className="bg-[#003161] text-white px-4 py-2 rounded hover:bg-[#006A67] transition duration-300"
            onClick={handleSearch} // Trigger search when clicked
          >
            Search
          </button>
          <div className="flex items-center">
            <input
              type="text"
              className="border p-2 rounded focus:ring-2 focus:ring-[#006A67] focus:outline-none transition duration-300"
              placeholder="Enter name/number/job"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-sm text-[#003161]">
          Total Count: {filteredEmployees.length}
        </span>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#003161] text-white">
            <th className="border p-2">Unique Id</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile No</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Create Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id} className="hover:bg-[#FFF4B7] transition duration-300">
              <td className="border p-2">{employee._id}</td>
              <td className="border p-2">
                {/* Display image from file path */}
                {employee.f_Image && (
                  <img
                    src={`http://localhost:5000/${employee.f_Image}`} // Assuming the server is serving static files from a folder (e.g., uploads)
                    alt="Employee"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </td>
              <td className="border p-2">{employee.f_Name}</td>
              <td className="border p-2">{employee.f_Email}</td>
              <td className="border p-2">{employee.f_Mobile}</td>
              <td className="border p-2">{employee.f_Designation}</td>
              <td className="border p-2">{employee.f_gender}</td>
              <td className="border p-2">
                {employee.f_Course ? employee.f_Course.join(", ") : "No courses"}
              </td>
              <td className="border p-2">
                {new Date(employee.f_Createdate ?? Date.now()).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    if (employee._id) {
                      handleEdit(employee._id);
                    }
                  }}
                  className="bg-[#003161] text-white px-4 py-2 rounded hover:bg-[#006A67] transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee._id!)} // Delete employee
                  className="bg-[#D91C27] text-white px-4 py-2 rounded ml-4 hover:bg-[#B51C1F] transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
