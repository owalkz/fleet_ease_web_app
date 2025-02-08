import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  const navigator = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg rounded-b-md">
      {/* FleetEase Branding */}
      <div className="flex items-center gap-3">
        {/* Placeholder Logo (Replace with actual image if available) */}
        <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center text-blue-600 font-bold">
          F
        </div>
        <h1 className="text-lg tracking-wide font-bold">FleetEase</h1>
      </div>

      {/* Authenticated User Options */}
      {auth.token && (
        <div className="flex items-center gap-6">
          <Link
            to="/view-profile"
            className="text-white hover:text-blue-300 transition duration-300 font-medium"
          >
            My Profile
          </Link>
          <button
            onClick={() => {
              auth.logout();
              navigator("/login");
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 hover:cursor-pointer"
          >
            Logout
            <FaSignOutAlt size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
