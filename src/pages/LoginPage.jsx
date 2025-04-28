import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import truckImage from "../images/truck_no_bg.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginDetails = {
      emailAddress: email,
      password,
    };

    const response = await auth.loginUser(loginDetails);
    if (response == 200) {
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials Entered. Please Try Again");
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Left Section - Image Placeholder */}
      <div className="hidden md:flex w-3/5 items-center justify-center bg-blue-500">
        <img
          src={truckImage}
          alt="FleetEase Illustration"
          className="w-4/5 max-w-lg"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex w-full md:w-2/5 justify-center items-center p-6">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 hover:scale-105 shadow-md hover:cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>

          <p className="text-gray-600 text-center mt-2">
            Forgot Password?{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
