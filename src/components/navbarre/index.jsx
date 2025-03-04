import { Container, Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbarre({ darkMode }) {
  return (
    <Navbar
      expand="lg"
      className={darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}
    >
      <Container>
        <Navbar.Brand href="#home">
          Alan Grolleau - Developpeur Web
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/apropos">
              À propos
            </Nav.Link>
            <Nav.Link as={Link} to="/projets">
              Projets
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbarre;
