
const usePostReservation = () => {

  const postReservation = async (reservationData) => {

    try {
      
      const response = await fetch('https://paw-time.onrender.com/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      /* // fetch when running the app locally
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      */
      if (!response.ok) {
        throw new Error('Error creating reservation');
      }

      const newReservation = await response.json(); // Return the response data

      return newReservation;
    } catch (error) {
      console.error('Error submitting reservation:', error);
      throw error;
    }
  };

  return { postReservation };
};

export default usePostReservation;
