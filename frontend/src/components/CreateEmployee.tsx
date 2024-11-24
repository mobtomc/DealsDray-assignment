import React, { useState } from "react";
import { createEmployee } from "../services/api";
import { Employee } from "../types/Employee";

const CreateEmployee: React.FC = () => {
  const [formData, setFormData] = useState<Employee>({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
    f_Image: undefined,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, f_Image: e.target.files[0] });
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedCourses = formData.f_Course?.includes(value)
      ? formData.f_Course.filter((course) => course !== value)
      : [...(formData.f_Course || []), value];
    setFormData({ ...formData, f_Course: updatedCourses });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Simple Validation
    if (!formData.f_Name || !formData.f_Email || !formData.f_Mobile || !formData.f_Designation || !formData.f_gender) {
      setError("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "f_Course") {
        (value as string[]).forEach((course) => data.append("f_Course[]", course));
      } else {
        data.append(key, value as any);
      }
    });

    try {
      await createEmployee(data);
      alert("Employee created successfully");
      setFormData({
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_gender: "",
        f_Course: [],
        f_Image: undefined,
      }); // Reset the form
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Failed to create employee. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg mx-auto">
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="text"
        name="f_Name"
        placeholder="Name"
        value={formData.f_Name}
        onChange={handleChange}
        className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
      <input
        type="email"
        name="f_Email"
        placeholder="Email"
        value={formData.f_Email}
        onChange={handleChange}
        className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
      <input
        type="text"
        name="f_Mobile"
        placeholder="Mobile"
        value={formData.f_Mobile}
        onChange={handleChange}
        className="w-full p-3 border-2 border-[#003161] rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
      <select
        name="f_Designation"
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

      <fieldset className="border-2 p-4 rounded-lg shadow-md">
        <legend className="text-lg text-[#003161]">Gender</legend>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="f_gender"
              value="Male"
              checked={formData.f_gender === "Male"}
              onChange={handleChange}
              required
              className="form-radio text-blue-500"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="f_gender"
              value="Female"
              checked={formData.f_gender === "Female"}
              onChange={handleChange}
              required
              className="form-radio text-pink-500"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="border-2 p-4 rounded-lg shadow-md">
        <legend className="text-lg text-[#003161]">Courses</legend>
        {["MCA", "BCA", "BSc"].map((course) => (
          <label key={course} className="block mt-2">
            <input
              type="checkbox"
              value={course}
              checked={formData.f_Course?.includes(course) ?? false}
              onChange={handleCourseChange}
              className="form-checkbox text-blue-500"
            />
            <span className="ml-2">{course}</span>
          </label>
        ))}
      </fieldset>

      <input
        type="file"
        name="f_Image"
        onChange={handleFileChange}
        className="w-full border-2 border-[#003161] p-2 rounded-lg shadow-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#006A67] text-white rounded-lg shadow-lg hover:bg-[#003161] transition duration-300 ease-in-out"
      >
        Create Employee
      </button>
    </form>
  );
};

export default CreateEmployee;
