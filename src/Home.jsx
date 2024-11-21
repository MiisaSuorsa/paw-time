import './App.css';
import MapComponent from "./components/Map/MapComponent.jsx";
import NavbarComponent from './components/NavbarComponent.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="Home">
      <NavbarComponent/>
      <MapComponent/>
      <h4> This app is hosted at Netlify </h4>
    </div>
  );
}

export default Home;
