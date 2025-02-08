import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [userData, setUserData] = useState({ user: {} });
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await auth.getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [auth]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
          <FaUserCircle className="text-blue-500 text-7xl mb-4" />
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            My Profile
          </h2>

          <div className="w-full space-y-4">
            <ProfileDetail label="Full Name" value={userData.user["name"]} />
            <ProfileDetail label="Role" value={userData.user["accountType"]} />
            <ProfileDetail
              label="Email"
              value={userData.user["emailAddress"]}
            />
          </div>

          <Link
            to="/edit-profile"
            className="flex items-center gap-2 justify-center w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 font-medium mt-6"
          >
            <FaEdit /> Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
};

const ProfileDetail = ({ label, value }) => (
  <div className="flex flex-col w-full border-b pb-2">
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="text-gray-600">{value || "N/A"}</span>
  </div>
);

export default ProfilePage;
