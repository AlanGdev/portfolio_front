import Navbarre from '../navbarre';
import { Container, Button } from 'react-bootstrap';
function Header({ darkMode, setDarkMode }) {
  return (
    <header className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <Container className="pt-1 d-flex justify-content-end">
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant={darkMode ? 'outline-light' : 'outline-dark'}
        >
          {darkMode ? 'Passer en Mode Clair' : 'Passer en Mode Sombre'}
        </Button>
      </Container>
      <Navbarre darkMode={darkMode} />
    </header>
  );
}
export default Header;
