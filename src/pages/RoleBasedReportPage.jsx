import { useAuth } from "../auth/AuthProvider";
import DriverReportPage from "./DriverReportPage";
import ReportsPage from "./ReportsPage";

const RoleBasedReportPage = () => {
  const auth = useAuth();

  if (!auth) return <div>Loading user info...</div>;

  return auth.role === "driver" ? <DriverReportPage /> : <ReportsPage />;
};

export default RoleBasedReportPage;
