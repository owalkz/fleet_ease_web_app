import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issues with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const TripMap = ({ trip }) => {
  const path = trip.speedLogs.map((log) => [log.latitude, log.longitude]);

  return (
    <MapContainer
      center={path[0]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={path} color="blue" />

      <Marker position={path[0]}>
        <Popup>Start</Popup>
      </Marker>

      <Marker position={path[path.length - 1]}>
        <Popup>End</Popup>
      </Marker>

      {trip.speedLogs
        .filter((log) => log.eventType)
        .map((log, idx) => (
          <Marker
            key={idx}
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
  );
};

export default TripMap;
