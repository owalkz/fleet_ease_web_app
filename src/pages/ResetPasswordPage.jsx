import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import { FaLock } from "react-icons/fa";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.location.pathname.split("/").pop();

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    const response = await auth.resetPassword({ password }, token);
    if (response == 200) {
      toast.success("Password reset successfully!");
      navigate("/login");
    } else {
      toast.error("Failed to reset Password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center">
        <FaLock className="text-blue-500 text-6xl mb-4" />
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your new password below to regain access to your account.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 font-medium hover:cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
