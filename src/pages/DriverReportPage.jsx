import { useEffect, useState } from "react";
import { fetchDriverPerformanceReport } from "../api/ReportApis";
import DataTable from "../components/DataTable";

const formatDateTime = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DriverReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReport = async () => {
    try {
      const data = await fetchDriverPerformanceReport();
      setReport(data);
    } catch (err) {
      console.error("Failed to load driver report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  if (loading) return <div className="p-4">Loading driver performance...</div>;
  if (!report) return <div className="p-4">No report data available.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Performance Report</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Trips Completed</h2>
          <p className="text-xl font-bold">{report.tripCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Distance (km)</h2>
          <p className="text-xl font-bold">{report.totalDistance}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Average Speed (km/h)</h2>
          <p className="text-xl font-bold">{report.averageSpeed}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Harsh Events</h2>
          <p className="text-xl font-bold">{report.harshEvents}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Trips</h2>
      <DataTable
        data={report.recentTrips.map((trip) => ({
          ...trip,
          startTime: formatDateTime(trip.startTime),
          endTime: formatDateTime(trip.endTime),
        }))}
        columns={["tripId", "startTime", "endTime", "distanceTraveled"]}
      />
    </div>
  );
};

export default DriverReportPage;
