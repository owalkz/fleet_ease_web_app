const ReportCardGrid = ({ report }) => {
  if (!report) return null;

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white shadow rounded-lg p-4">
          <div className={`w-10 h-10 rounded-full mb-2 ${stat.color}`} />
          <p className="text-gray-600 text-sm">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportCardGrid;
