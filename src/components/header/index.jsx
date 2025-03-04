import Navbarre from '../navbarre';
import { Container, Button } from 'react-bootstrap';
function Header({ darkMode, setDarkMode }) {
  return (
    <header className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <Navbarre darkMode={darkMode} />
      <Container className="text-center mt-3">
        <Button
          onClick={() => setDarkMode(!darkMode)}
          variant={darkMode ? 'light' : 'dark'}
        >
          {darkMode ? 'Mode Clair' : 'Mode Sombre'}
        </Button>
      </Container>
    </header>
  );
}
export default Header;
