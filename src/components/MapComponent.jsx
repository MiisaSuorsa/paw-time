import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if Geolocation API is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set the user’s location in state
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location: ", error);
          // Fallback to a default location if needed
          setUserLocation([51.505, -0.09]); // Example default location (London)
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setUserLocation([51.505, -0.09]); // Default location
    }
  }, []);

  return (
    // Render map only if userLocation is available
    userLocation ? (
      <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    ) : (
      <p>Loading map...</p>
    )
  );
};

export default MapComponent;