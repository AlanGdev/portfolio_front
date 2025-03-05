import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import AuthModal from '../authmodal';

const Footer = ({ onLogin }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="">
      <FontAwesomeIcon icon={faLinkedin} />
      <Button variant="outline" onClick={() => setShowModal(true)}>
        Connexion Admin
      </Button>
      <div>
        <FontAwesomeIcon icon={faCopyright} />
        <span> 2025 Grolleau. Tous droits réservés</span>
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
