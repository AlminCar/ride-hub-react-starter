import React, { useEffect } from "react";
import "./os_map.css";

// OSMap.tsx

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L, { icon, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import { AvailableRide } from "@/types/rides";

// Fix Leaflet marker icons

delete (L.Icon.Default.prototype as any)._getIconUrl;

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
}); // Create custom blue icon (for comparison)
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RoutingProps {
  start: LatLngTuple;
  end: LatLngTuple;
}

const Routing = ({ start, end }: RoutingProps) => {
  console.log("Routing from:", start, "to:", end);
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

    const controller = new AbortController();

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`,

      { signal: controller.signal }
    )
      .then((res) => res.json())

      .then((data) => {
        if (data.routes?.[0]?.geometry) {
          const layer = L.geoJSON(data.routes[0].geometry, {
            style: { color: "#ff0000", weight: 4 },
          }).addTo(map);

          map.fitBounds(layer.getBounds());
        }
      })

      .catch(console.error);

    return () => {
      controller.abort();

      map.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map, start, end]);

  return null;
};

interface OSMapProps {
  rides?: AvailableRide[];
  showRoutes?: boolean;
  selectedRide?: AvailableRide | null;
  onPinClick?: (ride: AvailableRide) => void;
}

const OSMap = ({
  rides = [],
  showRoutes = false,
  selectedRide = null,
  onPinClick = (ride: AvailableRide) => {},
}: OSMapProps) => {
  console.log("Rides in OSMap:", rides);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={rides[0].fromCoordinates as LatLngTuple} // Default center, can be adjusted
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rides.map((ride) => {
          console.log("Ride coordinates:", ride.fromCoordinates);
          return (
            <Marker
              position={ride.fromCoordinates as LatLngTuple}
              icon={blueIcon}
              key={ride.id}
              eventHandlers={{
                click: (e) => {
                  console.log("Pin clicked:", ride.id);
                  onPinClick(ride);
                },
              }}
            >
              {/* <Popup>Start Point</Popup> */}
            </Marker>
          );
        })}
        {selectedRide && showRoutes && (
          <>
            <Routing
              start={selectedRide.fromCoordinates}
              end={selectedRide.toCoordinates}
            />
            <Marker
              position={selectedRide.toCoordinates as LatLngTuple}
              icon={redIcon}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default OSMap;
