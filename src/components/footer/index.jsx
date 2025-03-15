import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../authmodal';

const Footer = ({ onLogin, darkMode, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer
      className={`text-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text dark'}`}
    >
      <div className="text-end me-4">
        <Link to="https://www.linkedin.com/in/alan-grolleau-55a980a3/?originalSubdomain=fr">
          <FontAwesomeIcon
            icon={faLinkedin}
            aria-label="Visitez mon compte linkedIn"
            className={`fs-2 text-end ${darkMode ? 'text-light' : 'text-dark'}`}
          />
          <span className="sr-only">LinkedIn...</span>
          </Link>
      </div>

      <div className="mt-2">
        <FontAwesomeIcon icon={faCopyright} />
        <span> 2025 Grolleau. Tous droits réservés</span>
        <div>
          <Link
            to={isAuthenticated ? '/admin' : '#'}
            className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}
            onClick={() => {
              if (!isAuthenticated) setShowModal(true);
            }}
          >
            Admin
          </Link>
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
