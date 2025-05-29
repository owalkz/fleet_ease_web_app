import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 🏎️ Car icon (can be customized to look even cooler)
const carIcon = new L.Icon({
  iconUrl: "../../public/car.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const TripMap = ({ trip }) => {
  if (!trip.speedLogs || trip.speedLogs.length === 0) {
    return <p>No trip data available.</p>;
  }

  const fullPath = trip.speedLogs.map((log) => [log.latitude, log.longitude]);
  const [animatedPath, setAnimatedPath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!fullPath.length) return;

    intervalRef.current = setInterval(() => {
      if (currentIndex < fullPath.length) {
        setAnimatedPath((prev) => [...prev, fullPath[currentIndex]]);
        setCarPosition(fullPath[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 150); // Speed of animation

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, fullPath]);

  return (
    <div className="relative">
      <MapContainer
        center={fullPath[0]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Animated Route */}
        {animatedPath.length > 1 &&
          animatedPath.slice(1).map((point, idx) => {
            const prevPoint = animatedPath[idx];
            const currPoint = point;
            const speed = trip.speedLogs[idx + 1]?.speed || 0;

            let color = "green";
            if (speed >= 80) color = "red";
            else if (speed >= 40) color = "yellow";

            return (
              <Polyline
                key={`segment-${idx}`}
                positions={[prevPoint, currPoint]}
                color={color}
                weight={4}
              />
            );
          })}

        {/* Moving Car Marker */}
        {carPosition && <Marker position={carPosition} icon={carIcon} />}

        {/* Start Marker */}
        {fullPath[0] && (
          <Marker position={fullPath[0]}>
            <Popup>Start</Popup>
          </Marker>
        )}

        {/* End Marker */}
        {fullPath.length > 0 && (
          <Marker position={fullPath[fullPath.length - 1]}>
            <Popup>End</Popup>
          </Marker>
        )}

        {/* Event Markers */}
        {trip.speedLogs
          .filter((log) => log.eventType)
          .map((log, idx) => (
            <Marker
              key={`event-${idx}`}
              position={[log.latitude, log.longitude]}
              icon={
                new L.DivIcon({
                  html: `<span style="color:red;">⚠</span>`,
                  className: "text-lg",
                })
              }
            >
              <Popup>{log.eventType}</Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Speed Legend */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 rounded p-2 shadow-md flex space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <span>Safe</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-400 rounded-full" />
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-500 rounded-full" />
          <span>High Speed</span>
        </div>
      </div>
    </div>
  );
};

export default TripMap;
