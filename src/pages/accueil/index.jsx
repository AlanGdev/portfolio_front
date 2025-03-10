import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import './index.css';
const API_URL = import.meta.env.VITE_API_URL;

function Accueil({ darkMode }) {
  const [technologies, setTechnologies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch(`${API_URL}/api/techno`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des technologies');
        }
        const data = await response.json();
        setLoading(false);
        console.log("🔍 Données reçues de l'API :", data);
        setTechnologies(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchTechnologies();
  }, []);

  // Regrouper les technologies par domaine
  const domaines = {};
  technologies.forEach((tech) => {
    if (!domaines[tech.domaine]) {
      domaines[tech.domaine] = [];
    }
    domaines[tech.domaine].push(tech);
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Technologies utilisées</h2>
      {loading && (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {Object.keys(domaines).map((domaine) => (
        <div key={domaine} className="mb-4">
          <h3 className={`${darkMode ? 'text-light' : 'text-dark'}`}>
            {domaine}
          </h3>
          <Row className="justify-content-start">
            {domaines[domaine].map((tech) => (
              <Col
                md="auto"
                sm="auto"
                xs="auto"
                key={tech._id}
                className="mb-3"
              >
                <Card
                  className={`technology-card h-100 text-center shadow-sm ${darkMode ? 'bg-secondary text-light border-light' : 'bg-light text-dark border-dark'}`}
                >
                  <Card.Img
                    variant="top"
                    src={tech.image}
                    alt={tech.nom}
                    className="h-100 p-1 mx-auto"
                    style={{ maxHeight: '100px', objectFit: 'contain' }}
                  />
                  <Card.Body className="d-none d-md-block px-1 py-0">
                    <Card.Title>{tech.nom}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Accueil;
