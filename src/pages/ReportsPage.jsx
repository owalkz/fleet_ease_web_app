import { useEffect, useState } from "react";
import {
  fetchManagerOverviewReport,
  fetchMonthlyTripStats,
  fetchDriverSummaryReport,
  fetchDriversWithExpiringLicenses,
  fetchTripSummaryReport,
  fetchHarshEventsReport,
  fetchVehicleUsageReport,
  fetchVehicleUsageBreakdown,
  fetchVehiclesWithExpiringInsurance,
  fetchServiceOverdueVehicles,
} from "../api/ReportApis";

import TripStatsChart from "../components/TripStatsChart";
import ReportCardGrid from "../components/ReportCardGrid";
import DataTable from "../components/DataTable";
import TabGroup from "../components/TabGroup";
import DateRangePicker from "../components/DateRangePicker";
import { getBase64FromImage } from "../utils/imageUtils";
import PdfPreviewModal from "../components/PdfPreviewModal";

import {
  exportFleetOverviewToPDF,
  exportDriverReportToPDF,
  exportTripReportToPDF,
  exportVehicleReportToPDF,
} from "../utils/pdfUtils";

const isWithinRange = (date, startDate, endDate) => {
  if (!date) return false;
  const d = new Date(date);
  if (startDate && d < new Date(startDate)) return false;
  if (endDate && d > new Date(endDate)) return false;
  return true;
};

const companyLogo = "";

const ReportsPage = () => {
  const [filters, setFilters] = useState({ startDate: null, endDate: null });

  const [overview, setOverview] = useState(null);
  const [driverSummary, setDriverSummary] = useState([]);
  const [expiringLicenses, setExpiringLicenses] = useState([]);
  const [tripSummary, setTripSummary] = useState(null);
  const [harshEvents, setHarshEvents] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [vehicleUsage, setVehicleUsage] = useState([]);
  const [vehicleBreakdown, setVehicleBreakdown] = useState([]);
  const [expiringInsurance, setExpiringInsurance] = useState([]);
  const [overdueService, setOverdueService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  const loadReports = async () => {
    setLoading(true);
    try {
      const [
        overviewData,
        monthlyData,
        driverSummaryData,
        expiringLicenseData,
        tripSummaryData,
        harshEventsData,
        vehicleUsageData,
        vehicleBreakdownData,
        expiringInsuranceData,
        overdueServiceData,
      ] = await Promise.all([
        fetchManagerOverviewReport(),
        fetchMonthlyTripStats(),
        fetchDriverSummaryReport(),
        fetchDriversWithExpiringLicenses(),
        fetchTripSummaryReport(),
        fetchHarshEventsReport(),
        fetchVehicleUsageReport(),
        fetchVehicleUsageBreakdown(),
        fetchVehiclesWithExpiringInsurance(),
        fetchServiceOverdueVehicles(),
      ]);

      setOverview(overviewData);
      setMonthlyStats(monthlyData);
      setDriverSummary(driverSummaryData);
      setExpiringLicenses(expiringLicenseData);
      setTripSummary(tripSummaryData);
      setHarshEvents(harshEventsData);
      setVehicleUsage(vehicleUsageData);
      setVehicleBreakdown(vehicleBreakdownData);
      setExpiringInsurance(expiringInsuranceData);
      setOverdueService(overdueServiceData);
      console.log(monthlyData);
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const filterByDate = (items, field) => {
    return items.filter((item) =>
      isWithinRange(item[field], filters.startDate, filters.endDate)
    );
  };

  // Only filter harshEvents by startTime date range
  const filteredHarshEvents = filterByDate(harshEvents, "startTime");

  // No filtering for others; use original data as is
  const filteredDriverSummary = driverSummary;
  const filteredVehicleUsage = vehicleUsage;
  const filteredVehicleBreakdown = vehicleBreakdown;
  const filteredTripSummary = tripSummary;
  const filteredMonthlyStats = monthlyStats;

  if (loading) return <div className="p-4">Loading Reports...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Fleet Reports</h1>

      <div className="mb-6">
        <DateRangePicker value={filters} onChange={setFilters} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {/* Overview */}
        <button
          onClick={() => {
            const url = exportFleetOverviewToPDF(
              overview,
              filteredMonthlyStats,
              filters,
              companyLogo,
              true // preview
            );
            setPdfUrl(url);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Preview Overview PDF
        </button>
        <button
          onClick={() =>
            exportFleetOverviewToPDF(
              overview,
              filteredMonthlyStats,
              filters,
              companyLogo
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Overview PDF
        </button>

        {/* Drivers */}
        <button
          onClick={() => {
            const url = exportDriverReportToPDF(
              filteredDriverSummary,
              expiringLicenses,
              filters,
              companyLogo,
              true // preview
            );
            setPdfUrl(url);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Preview Drivers PDF
        </button>
        <button
          onClick={() =>
            exportDriverReportToPDF(
              filteredDriverSummary,
              expiringLicenses,
              filters,
              companyLogo
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export Drivers PDF
        </button>

        {/* Trips */}
        <button
          onClick={() => {
            const url = exportTripReportToPDF(
              filteredTripSummary,
              filteredHarshEvents,
              filters,
              companyLogo,
              true // preview
            );
            setPdfUrl(url);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Preview Trips PDF
        </button>
        <button
          onClick={() =>
            exportTripReportToPDF(
              filteredTripSummary,
              filteredHarshEvents,
              filters,
              companyLogo
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export Trips PDF
        </button>

        {/* Vehicles */}
        <button
          onClick={() => {
            const url = exportVehicleReportToPDF(
              filteredVehicleUsage,
              filteredVehicleBreakdown,
              expiringInsurance,
              overdueService,
              filters,
              companyLogo,
              true // preview
            );
            setPdfUrl(url);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Preview Vehicles PDF
        </button>
        <button
          onClick={() =>
            exportVehicleReportToPDF(
              filteredVehicleUsage,
              filteredVehicleBreakdown,
              expiringInsurance,
              overdueService,
              filters,
              companyLogo
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export Vehicles PDF
        </button>
      </div>

      <TabGroup
        tabs={{
          Overview: (
            <>
              <ReportCardGrid report={overview} />
              <TripStatsChart stats={filteredMonthlyStats} />
            </>
          ),
          Drivers: (
            <>
              <h2 className="text-xl font-bold my-4">Driver Summary</h2>
              <DataTable
                data={filteredDriverSummary}
                columns={[
                  "name",
                  "tripCount",
                  "totalDistance",
                  "harshEvents",
                  "avgDistance",
                ]}
              />
              <h2 className="text-xl font-bold my-4">Expiring Licenses</h2>
              <DataTable
                data={expiringLicenses}
                columns={["name", "emailAddress", "licenseExpiryDate"]}
              />
            </>
          ),
          Trips: (
            <>
              <h2 className="text-xl font-bold my-4">Trip Summary</h2>
              <ul className="list-disc list-inside">
                {filteredTripSummary &&
                  Object.entries(filteredTripSummary).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                      {value}
                    </li>
                  ))}
              </ul>
              <h2 className="text-xl font-bold my-4">Harsh Events</h2>
              <DataTable
                data={filteredHarshEvents.map((e) => ({
                  ...e,
                  vehicle: e.vehicle
                    ? `${e.vehicle.make} ${e.vehicle.model} (${e.vehicle.licensePlateNumber})`
                    : "N/A",
                  startTime: new Date(e.startTime).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                  endTime: new Date(e.endTime).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                }))}
                columns={[
                  "tripId",
                  "vehicle",
                  "harshEventCount",
                  "startTime",
                  "endTime",
                ]}
              />
            </>
          ),
          Vehicles: (
            <>
              <h2 className="text-xl font-bold my-4">Vehicle Usage Report</h2>
              <DataTable
                data={filteredVehicleUsage}
                columns={[
                  "make",
                  "model",
                  "licensePlateNumber",
                  "tripCount",
                  "totalDistance",
                  "averageSpeed",
                ]}
              />
              <h2 className="text-xl font-bold my-4">Usage Breakdown</h2>
              <DataTable
                data={filteredVehicleBreakdown}
                columns={[
                  "make",
                  "model",
                  "licensePlateNumber",
                  "tripCount",
                  "totalDistance",
                  "averageSpeed",
                ]}
              />
              <h2 className="text-xl font-bold my-4">Expiring Insurance</h2>
              <DataTable
                data={expiringInsurance.map((v) => ({
                  ...v,
                  insuranceExpiryDate: formatDate(v.insuranceExpiryDate),
                }))}
                columns={[
                  "make",
                  "model",
                  "licensePlateNumber",
                  "insuranceExpiryDate",
                ]}
              />
              <h2 className="text-xl font-bold my-4">Service Overdue</h2>
              <DataTable
                data={overdueService}
                columns={[
                  "make",
                  "model",
                  "licensePlateNumber",
                  "mileage",
                  "nextServiceMileage",
                ]}
              />
            </>
          ),
        }}
      />
      {pdfUrl && <div>Modal should be here</div>}
      <PdfPreviewModal pdfUrl={pdfUrl} onClose={() => setPdfUrl(null)} />
    </div>
  );
};

export default ReportsPage;
