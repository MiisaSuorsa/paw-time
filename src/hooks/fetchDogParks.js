import { useState, useEffect } from "react";

//const API_KEY = process.env.GEOAPIFY_KEY; // Securely store the API key in environment variables


const useFetchDogParks = (userLocation, radius = 5000) => {
  const [dogParks, setDogParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDogParks = async () => {

      try {
        const defaultLocation = [62.9338, 27.6539];
        const [lat, lon] = userLocation || defaultLocation;

        const url = `https://api.geoapify.com/v2/places?categories=pet.dog_park&filter=circle:${lon},${lat},${radius}&apiKey=32222884aab64afa940c0862d25362c4`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching dog parks: ${response.statusText}`);
        }

        const data = await response.json();
        setDogParks(data.features || []);
        console.log("fetched");
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
  }, [userLocation, radius]); // Re-run effect if userLocation or radius changes

  return { dogParks, loading, error };
};

export default useFetchDogParks;