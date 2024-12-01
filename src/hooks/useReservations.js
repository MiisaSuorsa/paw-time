import { useState, useEffect } from "react";


const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reservations from the backend when the component mounts
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          //const response = await fetch('http://localhost:5000/api/reservations');
          const response = await fetch('https://paw-time.onrender.com/api/reservations');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setReservations(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchReservations();
    }, []);

    return { reservations, loading, error };
};

export default useReservations;