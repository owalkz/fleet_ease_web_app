import { useEffect, useState } from "react";
import { fetchDriverPerformanceReport } from "../api/ReportApis";
import { exportDriverReportToPDF } from "../utils/pdfUtils";
import DataTable from "../components/DataTable";
import { useAuth } from "../auth/AuthProvider";
import PdfPreviewModal from "../components/PdfPreviewModal";

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
  const companyLogo = "data:image/png;base64,INSERT_BASE64_STRING_HERE";
  const [previewUrl, setPreviewUrl] = useState(null);
  const auth = useAuth();

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

  const generateReportDoc = () => {
    const summary = {
      name: auth.userName,
      tripCount: report.tripCount,
      totalDistance: report.totalDistance,
      harshEvents: report.harshEvents,
      avgDistance:
        report.totalDistance && report.tripCount
          ? (report.totalDistance / report.tripCount).toFixed(2)
          : 0,
    };

    return exportDriverReportToPDF(
      [summary],
      [], // No expiring licenses
      {}, // No filters
      companyLogo
    );
  };

  const previewPDF = () => {
    const doc = generateReportDoc();
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    console.log(url);
    setPreviewUrl(url);
  };

  const downloadPDF = () => {
    const doc = generateReportDoc();
    doc.save("driver-performance-report.pdf");
  };

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

      <div className="mb-6 flex gap-4">
        <button
          onClick={previewPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Preview PDF
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <PdfPreviewModal
        pdfUrl={previewUrl}
        onClose={() => setPreviewUrl(null)}
      />

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
