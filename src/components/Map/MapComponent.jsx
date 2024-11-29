import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useFetchDogParks from '../../hooks/useDogParks';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PawIcon from './pawIcon.png';


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

  const { dogParks, loading, error } = useFetchDogParks(userLocation, 5000); // 5km radius

  //UseNavigate for redirecting to reservation page through the button
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/Reservations');
  };

  const dogParkIcon = L.icon({
      iconUrl:PawIcon,  // Choose different icon based on the park's status
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
  });

  return (
    // Render map only if userLocation is available
    userLocation ? (
      <MapContainer center={userLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          {loading && <p>Loading dog parks...</p>}
          {error && <p>Error: {error}</p>}
          {dogParks.map((park) => (
          <Marker
            icon={dogParkIcon}
            key={park.properties.place_id}
            position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0],
            ]}
          >
            <Popup>
              <strong>{park.properties.name}</strong>
              <p>{park.properties.address_line1}</p>
              <Button variant="outline-dark" onClick={handleButtonClick}>Book slot</Button>
            </Popup>
          </Marker>
          ))}

      </MapContainer>
    ) : (
      <p>Loading map...</p>
    )
  );
};

/*
icon={dogParkIcon}

{loading && <p>Loading dog parks...</p>}
      {error && <p>Error: {error}</p>}
      {dogParks.map((park) => (
        <Marker
          key={park.properties.place_id}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <strong>{park.properties.name}</strong>
            <p>{park.properties.address_line1}</p>
          </Popup>
        </Marker>
      ))}

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
*/

export default MapComponent;
