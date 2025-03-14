import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';
const API_URL = import.meta.env.VITE_API_URL;

function Projets({ darkMode }) {
  const [error, setError] = useState('');
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        setLoading(false);
        setProjets(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Mes Projets</h1>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {projets.map((projet) => (
          <Col md={4} key={projet._id} className="mb-4">
            <Card
              className={`h-100 card-hover shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
              onClick={() => navigate(`/projets/${projet._id}`)}
              style={{ cursor: 'pointer' }}
            >
              {projet.image && (
                <Card.Img
                  variant="top"
                  src={projet.image}
                  alt={projet.nom}
                  className=" img-fluid object-fit-contain"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectPosition: 'top',
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title className="text-center fw-bold">
                    {projet.nom}
                  </Card.Title>
                </div>
                <div>
                  <strong>Catégorie :</strong> {projet.categorie}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Projets;
