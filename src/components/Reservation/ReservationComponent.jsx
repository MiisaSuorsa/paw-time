import NavbarComponent from "../NavbarComponent";
import ReservationList from "./ReservationList";
import ReservationForm from "./ReservationForm";

function ReservationComponent() {
  return (
    <div className="Reservations">
        <NavbarComponent/>
        <h2>Reservations</h2>
        <ReservationList/>
        <ReservationForm/>
    </div>
  );
}

export default ReservationComponent;
