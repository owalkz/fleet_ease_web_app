import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import { FaEnvelope } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { emailAddress: email };

    const response = await auth.forgotPassword(userData);
    if (response == 200) {
      toast.success("The Password Reset Link has been sent to your email.");
      navigate("/login");
    } else {
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center">
        <FaEnvelope className="text-blue-500 text-6xl mb-4" />
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email below and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 font-medium hover:cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
