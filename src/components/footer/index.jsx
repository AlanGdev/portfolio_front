import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthModal from '../authmodal';

const Footer = ({ onLogin, darkMode }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer
      className="text-center py-3"
      style={{
        backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      <FontAwesomeIcon icon={faLinkedin} />

      <div className="mt-2">
        <FontAwesomeIcon icon={faCopyright} />
        <span> 2025 Grolleau. Tous droits réservés</span>
        <div>
          <Button
            variant={darkMode ? 'light' : 'dark'}
            onClick={() => setShowModal(true)}
            className="ms-2 w-100"
          >
            Connexion Admin
          </Button>
        </div>
      </div>
      <AuthModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onLogin={onLogin}
      />
    </footer>
  );
};
export default Footer;
