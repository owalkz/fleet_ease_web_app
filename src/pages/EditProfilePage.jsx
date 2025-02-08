import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import { FaUserEdit } from "react-icons/fa";

const EditProfilePage = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name };

    const response = await auth.editUserProfile(userData);
    if (response === 200) {
      toast.success("Profile updated successfully!");
      navigate("/view-profile");
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        <FaUserEdit className="text-blue-500 text-6xl mb-4" />
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 font-medium hover:cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
