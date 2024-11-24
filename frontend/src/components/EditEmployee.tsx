import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Employee } from "../types/Employee";

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Employee>({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
    f_Image: "",
    f_Createdate: "",
    _id: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Invalid employee ID.");
      setLoading(false);
      return;
    }

    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get<Employee>(`http://localhost:5000/api/employees/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCourses = checked
        ? [...(prevData.f_Course || []), value] // Ensure f_Course is an array
        : (prevData.f_Course || []).filter((course) => course !== value); // Filter from an array
  
      return { ...prevData, f_Course: updatedCourses };
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        f_Image: file.name, // Store file name or handle accordingly
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData._id) {
        setError("Employee ID is missing");
        return;
      }

      await axios.put(`http://localhost:5000/api/employees/${formData._id}`, formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update employee.");
      console.error("Error updating employee:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <div className="text-xl font-bold mb-6 text-[#000B58]">Edit Employee</div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="f_Name" className="block text-sm font-medium text-[#003161]">Full Name</label>
          <input
            type="text"
            name="f_Name"
            id="f_Name"
            placeholder="Enter Name"
            value={formData.f_Name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="f_Email" className="block text-sm font-medium text-[#003161]">Email</label>
          <input
            type="email"
            name="f_Email"
            id="f_Email"
            placeholder="Enter Email"
            value={formData.f_Email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="f_Mobile" className="block text-sm font-medium text-[#003161]">Mobile</label>
          <input
            type="text"
            name="f_Mobile"
            id="f_Mobile"
            placeholder="Enter Mobile Number"
            value={formData.f_Mobile}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="f_Designation" className="block text-sm font-medium text-[#003161]">Designation</label>
          <select
            name="f_Designation"
            id="f_Designation"
            value={formData.f_Designation}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <fieldset className="border-2 p-4 rounded-lg shadow-md">
          <legend className="text-lg text-[#003161]">Gender</legend>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="f_gender"
                value="Male"
                checked={formData.f_gender === "Male"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              Male
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="f_gender"
                value="Female"
                checked={formData.f_gender === "Female"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              Female
            </label>
          </div>
        </fieldset>

        <fieldset className="border-2 p-4 rounded-lg shadow-md">
          <legend className="text-lg text-[#003161]">Courses</legend>
          <div className="space-y-2">
            {["MCA", "BCA", "BSc"].map((course) => (
              <label key={course} className="block flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={course}
                  checked={formData.f_Course?.includes(course) ?? false}
                  onChange={handleCourseChange}
                  className="mr-2"
                />
                {course}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-2 p-4 rounded-lg shadow-md">
          <legend className="text-lg text-[#003161]">Upload Image</legend>
          <input
            type="file"
            name="f_Image"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A67] transition-shadow ease-in-out duration-300"
          />
        </fieldset>

        <button
          type="submit"
          className="w-full py-3 text-white bg-[#006A67] hover:bg-[#003161] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A67] shadow-md transition-transform ease-in-out duration-300"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
