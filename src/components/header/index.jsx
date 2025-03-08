import Navbarre from '../navbarre';
import { Container, Button } from 'react-bootstrap';
function Header({ darkMode, setDarkMode }) {
  return (
    <header className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <Container className="text-center mt-3">
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant={darkMode ? 'outline-light' : 'outline-dark'}
          className="w-100"
        >
          {darkMode ? 'Passer en Mode Clair' : 'Passer en Mode Sombre'}
        </Button>
      </Container>
      <Navbarre darkMode={darkMode} />
    </header>
  );
}
export default Header;
