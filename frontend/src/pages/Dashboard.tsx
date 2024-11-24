import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeList from "../components/EmployeeList";
import CreateEmployee from "../components/CreateEmployee";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"list" | "create">("list"); // Toggle between views

  return (
    <div>
    
      <div className="p-6">
        {/* Toggle button */}
        <button
          onClick={() => setView(view === "list" ? "create" : "list")}
          className="bg-[#000B58] text-white px-4 py-2 rounded mb-4 hover:bg-[#006A67]"
        >
          {view === "list" ? "Create Employee" : "Back to Employee List"}
        </button>

        {/* Conditionally render the EmployeeList or CreateEmployee */}
        {view === "list" ? <EmployeeList /> : <CreateEmployee />}
      </div>
    </div>
  );
};

export default Dashboard;

