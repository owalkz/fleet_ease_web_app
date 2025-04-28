import { useEffect, useState } from "react";
import { getManagerTrips } from "../api/TripApis";
import { Link } from "react-router-dom";
import { FaCar, FaRoad, FaClock } from "react-icons/fa";
import { MdPending, MdCheckCircle } from "react-icons/md";

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const managerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getManagerTrips(managerId);
        setTrips(data);
        setFilteredTrips(data); // Initialize filtered trips
      } catch (err) {
        console.error("Error fetching trips", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [managerId]);

  useEffect(() => {
    // Apply search filtering
    const filtered = trips.filter((trip) => {
      const driverName = trip.driverId?.name?.toLowerCase() || "";
      const vehicleMake = trip.vehicleId?.make?.toLowerCase() || "";
      const licensePlate =
        trip.vehicleId?.licensePlateNumber?.toLowerCase() || "";

      const query = searchTerm.toLowerCase();

      return (
        driverName.includes(query) ||
        vehicleMake.includes(query) ||
        licensePlate.includes(query)
      );
    });

    setFilteredTrips(filtered);
  }, [searchTerm, trips]);

  if (loading) return <div className="p-4">Loading trips...</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Trips</h2>

        {/* 🔍 Search Field */}
        <input
          type="text"
          placeholder="Search by driver, vehicle, or plate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredTrips.length === 0 ? (
        <div className="text-gray-500">No trips found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Link
              to={`/dashboard/trip/${trip._id}`}
              key={trip._id}
              className="block p-4 rounded-lg shadow hover:shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 hover:bg-blue-50"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  {trip.vehicleId?.make} - {trip.vehicleId?.licensePlateNumber}
                </h3>
                <span
                  className={`text-sm font-medium ${
                    trip.status === "completed"
                      ? "text-green-600"
                      : trip.status === "pending"
                      ? "text-yellow-500"
                      : "text-blue-600"
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="flex flex-col space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaCar className="text-blue-500" />
                  <span>{trip.driverId?.name ?? "Unknown Driver"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaRoad className="text-purple-500" />
                  <span>{(trip.distanceTraveled ?? 0).toFixed(2)} km</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" />
                  <span>
                    {trip.startTime
                      ? new Date(trip.startTime).toLocaleString()
                      : "Not started"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                {trip.status === "pending" ? (
                  <MdPending className="text-yellow-500 text-2xl" />
                ) : (
                  <MdCheckCircle className="text-green-500 text-2xl" />
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
