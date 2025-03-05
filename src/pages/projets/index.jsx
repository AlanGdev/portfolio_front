import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Projets() {
  const [error, setError] = useState('');
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/projects');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        setProjets(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Mes Projets</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {projets.map((projet) => (
          <Col md={4} key={projet._id} className="mb-4">
            <Card
              className="card-hover shadow-sm"
              onClick={() => navigate(`/projets/${projet._id}`)}
              style={{ cursor: 'pointer' }}
            >
              {projet.image && (
                <Card.Img variant="top" src={projet.image} alt={projet.nom} />
              )}
              <Card.Body>
                <Card.Title>{projet.nom}</Card.Title>
                <Card.Text>{projet.description}</Card.Text>
                <div className="mb-2">
                  <strong>Catégorie :</strong> {projet.categorie}
                </div>
                <div className="mb-2">
                  <strong>Technologies :</strong>{' '}
                  {projet.technologies.join(', ')}
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
