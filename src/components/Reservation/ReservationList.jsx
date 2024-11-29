import useReservations from "../../hooks/useReservations";

function ReservationList() {

  const { reservations, loading, error } = useReservations();

    return (
      <div class="ReservationForm">
          <h2>List of reservations and details</h2>
          <ul>
          {loading && <p>Loading dog parks...</p>}
          {error && <p>Error: {error}</p>}
          {reservations.map(reservation => (
          <li key={reservation._id}>
            <strong>Park ID:</strong> {reservation.parkId} <br />
            <strong>Date:</strong> {reservation.date} <br />
            <strong>Time Slot:</strong> {reservation.timeSlot}
          </li>
        ))}
      </ul>
      </div>
    );
  }
  
  export default ReservationList;
