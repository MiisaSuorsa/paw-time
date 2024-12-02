import usePostReservation from "../../hooks/usePostReservations";

function ReservationForm() {

  //Post method
  const {  postReservation  } = usePostReservation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      parkId: event.target.parkId.value,
      date: event.target.date.value,
      timeSlot: event.target.time.value,
      description: event.target.description.value,
      allowOthersToJoin: event.target.allowOthers.checked,
      additionalDetails: event.target.additional.value,
    };

    try {
      const result = await postReservation(formData);
      console.log('Reservation saved:', result);

      // Clear the form after submission
      event.target.reset();
      alert('Reservation submitted successfully!');
    } catch (error) {
      alert('Error submitting reservation.');
    }
  }

  return (
    <div class="ReservationForm">
        <h2>Fill the form</h2>
        <form onSubmit={handleSubmit}>
          <label>Park id:</label>
          <input type="text" name="parkId" required/> <br/>
          <label>Date:</label>
          <input type="text" name="date" placeholder="Select date" required/> <br/>
          <label>Timeslot:</label>
          <input type="text" name="time" placeholder="Select time" required/> <br/>
          <label>Description of the reservation and the dog:</label>
          <input type="text" name="description" placeholder="Description" required/> <br/>
          <label>Want others to join:</label>
          <input type="checkbox" name="allowOthers" required/> <br/>
          <label>Additional details:</label>
          <input type="text" name="additional"/> <br/>

          <button type="submit"> Reserve </button>
        </form>
    </div>
  );
}

export default ReservationForm;


//data form
/*
2024-12-24
19:30-20:00
big dog wants to play with another big dog
*/
