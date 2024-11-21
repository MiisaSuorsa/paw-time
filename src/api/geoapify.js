//https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:27.597312252664597,62.9702716251894,27.86806248256958,62.84983223679099&limit=20&apiKey=YOUR_API_KEY


import { useState, useEffect } from 'react';

// Your custom hook that fetches dog parks data
const useFetchDogParks = (userLocation) => {
  const [dogParks, setDogParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogParks = async () => {
      const API_KEY = process.env.REACT_APP_GEOAPIFY_KEY; // Securely store your API key

      // Default to Kuopio, Finland, if no user location
      const defaultLocation = [62.9338, 27.6539]; 
      const [lat, lon] = userLocation || defaultLocation;

      // Define a bounding box for the search area (you can modify the range)
      const northEastLat = lat + 0.1;
      const southWestLat = lat - 0.1;
      const eastLon = lon + 0.1;
      const westLon = lon - 0.1;

      // Construct the Geoapify API URL
      const url = `https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=rect:${westLon},${southWestLat},${eastLon},${northEastLat}&limit=20&apiKey=${API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching dog parks: ${response.statusText}`);
        }
        const data = await response.json();
        setDogParks(data.features || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dog parks:", err);
        setError('Failed to fetch dog parks');
        setLoading(false);
      }
    };

    if (userLocation) {
      fetchDogParks(); // Trigger fetch when userLocation changes
    }
  }, [userLocation]); // Dependency array ensures the hook runs when userLocation changes

  return { dogParks, loading, error };
};

export default useFetchDogParks;
