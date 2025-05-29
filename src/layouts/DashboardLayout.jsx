import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaRoute,
  FaCar,
  FaUserTie,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const auth = useAuth();

  const role = auth.role;
  console.log(auth);

  function handleLogout() {
    auth.logout();
    navigate("/");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-16 bg-gray-800 text-white flex flex-col items-center py-6 space-y-6">
        {role === "manager" && (
          <SidebarIcon to="/dashboard/trips" icon={<FaRoute />} label="Trips" />
        )}

        {/* Reports tab is shown to both roles */}
        {(role === "manager" || role === "driver") && (
          <SidebarIcon
            to="/dashboard/reports"
            icon={<FaChartBar />}
            label="Reports"
          />
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Logout */}
        <SidebarButton
          onClick={handleLogout}
          icon={<FaSignOutAlt />}
          label="Logout"
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarIcon({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className="group relative flex items-center justify-center w-12 h-12 hover:bg-gray-700 rounded"
    >
      {icon}
      <span className="absolute left-14 whitespace-nowrap text-sm bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </NavLink>
  );
}

function SidebarButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center w-12 h-12 hover:bg-red-600 rounded"
    >
      {icon}
      <span className="absolute left-14 whitespace-nowrap text-sm bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </button>
  );
}
