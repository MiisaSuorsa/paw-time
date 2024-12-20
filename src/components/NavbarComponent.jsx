import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PawIcon from './Map/pawIcon.png';

//Navbar component copied from https://react-bootstrap.netlify.app/docs/components/navbar
function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/">
                <img src={PawIcon} 
                     width="30" height="30" 
                     alt="Logo" />
                <span className="brand-text">
                      PawTime
                </span>
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Reservations">Reservations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

/*<Navbar.Brand href="/">PawTime</Navbar.Brand>*/
