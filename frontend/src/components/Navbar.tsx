import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-[#003161] p-4">
      <div className="flex justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold">
          Logo
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-white">Home</Link>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
          {user && (
            <>
              <span className="text-white">{user.f_userName}</span> {/* Display logged-in username */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
