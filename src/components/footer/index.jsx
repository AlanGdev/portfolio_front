import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <FontAwesomeIcon icon={faLinkedin} />
      <div>
        <FontAwesomeIcon icon={faCopyright} />
        <span> 2025 Grolleau. Tous droits réservés</span>
      </div>
    </footer>
  );
}
export default Footer;
