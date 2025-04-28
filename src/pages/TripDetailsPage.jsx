import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripDetails } from "../api/TripApis";
import TripMap from "../components/TripMap";

const TripDetailsPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const data = await getTripDetails(tripId);
        setTrip(data);
      } catch (err) {
        console.error("Error loading trip details", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
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
