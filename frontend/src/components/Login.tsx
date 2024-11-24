import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ f_userName: username, f_Pwd: password });
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          f_userName: data.f_userName, // Store the username in localStorage
        })
      );
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid login details");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#FFF4B7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#000B58]">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border-2 border-[#003161] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A67] transition duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border-2 border-[#003161] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006A67] transition duration-300"
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#003161] text-white rounded-md text-lg hover:bg-[#006A67] transition duration-300"
        >
          Login
        </button>
        
      </form>
    </div>
  );
};

export default Login;

