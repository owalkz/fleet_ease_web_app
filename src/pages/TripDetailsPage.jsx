import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripDetails } from "../api/TripApis";
import TripMap from "../components/TripMap";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const loadTrip = async () => {
      try {
        const data = await getTripDetails(tripId);
        setTrip((prev) => {
          // If trip was ongoing but is now completed, stop polling
          if (prev?.status !== "completed" && data.status === "completed") {
            clearInterval(intervalId);
          }
          return data;
        });

        // Start polling only if the trip is NOT completed
        if (data.status !== "completed" && !intervalId) {
          intervalId = setInterval(loadTrip, 5000); // Poll every 10s
        }
      } catch (err) {
        console.error("Error loading trip details", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrip(); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup
  }, [tripId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!trip) return <div className="p-4 text-red-600">Trip not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
      <div className="mb-4">
        <p>
          <strong>Driver:</strong> {trip.driverId?.name}
        </p>
        <p>
          <strong>Vehicle:</strong> {trip.vehicleId?.make} -{" "}
          {trip.vehicleId?.licensePlateNumber}
        </p>
        <p>
          <strong>Status:</strong> {trip.status}
        </p>
        <p>
          <strong>Distance:</strong> {trip.distanceTraveled?.toFixed(2) ?? 0} km
        </p>
      </div>

      <TripMap trip={trip} />
    </div>
  );
};

export default TripDetailsPage;
