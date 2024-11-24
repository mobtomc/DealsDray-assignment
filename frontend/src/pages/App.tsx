import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "./Dashboard";
import Home from "./Home"
import EditEmployee from "../components/EditEmployee";
import Navbar from "../components/Navbar";
const App: React.FC = () => {
  return (
    
    <Router>
       <Navbar />
      <Routes>
     
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
