import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthProvider";
import truckImage from "../images/truck_no_bg.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("driver");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, emailAddress: email, accountType: role, password };
    const response = await auth.registerUser(newUser);

    if (response === 201) {
      toast.success("Registration Successful!");
      navigator("/login");
    } else {
      toast.error("Registration Unsuccessful. Please Try Again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Left side: Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-blue-200">
        <img
          src={truckImage}
          alt="FleetEase Illustration"
          className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
        />
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">
            Register
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="driver">Driver</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 hover:cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
