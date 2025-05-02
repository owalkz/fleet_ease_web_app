import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  fetchManagerOverviewReport,
  fetchMonthlyTripStats,
} from "../api/ReportApis";
import TripStatsChart from "../components/TripStatsChart";

const ReportsPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    fetchMonthlyTripStats()
      .then(setStatistics)
      .catch((err) => console.error("Error loading chart data", err));
  }, []);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await fetchManagerOverviewReport();
        setReport(data);
      } catch (e) {
        console.error("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!report)
    return <div className="p-4 text-red-600">Failed to load report</div>;

  const stats = [
    {
      label: "Total Drivers",
      value: report.totalDrivers,
      color: "bg-blue-500",
    },
    {
      label: "Active Vehicles",
      value: report.activeVehicles,
      color: "bg-green-500",
    },
    {
      label: "Available Vehicles",
      value: report.availableVehicles,
      color: "bg-yellow-500",
    },
    { label: "Total Trips", value: report.totalTrips, color: "bg-indigo-500" },
    {
      label: "Completed Trips",
      value: report.completedTrips,
      color: "bg-teal-500",
    },
    {
      label: "Pending Trips",
      value: report.pendingTrips,
      color: "bg-orange-500",
    },
    { label: "Active Trips", value: report.activeTrips, color: "bg-red-500" },
    {
      label: "Total Distance",
      value: `${report.totalDistance} km`,
      color: "bg-purple-500",
    },
    {
      label: "Harsh Events",
      value: report.harshEventCount,
      color: "bg-rose-500",
    },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Fleet Overview Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Total Drivers", report.totalDrivers],
        ["Active Vehicles", report.activeVehicles],
        ["Available Vehicles", report.availableVehicles],
        ["Total Trips", report.totalTrips],
        ["Completed Trips", report.completedTrips],
        ["Pending Trips", report.pendingTrips],
        ["Active Trips", report.activeTrips],
        ["Total Distance", `${report.totalDistance} km`],
        ["Harsh Events", report.harshEventCount],
      ],
    });

    doc.save("fleet-overview-report.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Fleet Overview Report</h1>
      <div className="mb-4">
        <button
          onClick={exportToPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4">
            <div className={`w-10 h-10 rounded-full mb-2 ${stat.color}`} />
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      {stats.length > 0 ? (
        <TripStatsChart stats={statistics} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ReportsPage;
