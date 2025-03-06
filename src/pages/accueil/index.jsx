import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import './index.css'; // Assurez-vous que le fichier CSS est bien importé

function Accueil() {
  const [technologies, setTechnologies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/techno');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des technologies');
        }
        const data = await response.json();
        setTechnologies(data);
      } catch (err) {
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

      {error && <Alert variant="danger">{error}</Alert>}

      {Object.keys(domaines).map((domaine) => (
        <div key={domaine} className="mb-4">
          <h3 className="text-primary">{domaine}</h3>
          <Row className="justify-content-center">
            {domaines[domaine].map((tech) => (
              <Col
                md="auto"
                sm="auto"
                xs="auto"
                key={tech._id}
                className="mb-3"
              >
                <Card className="technology-card text-center shadow-sm">
                  <Card.Img
                    variant="top"
                    src={tech.image}
                    alt={tech.nom}
                    className="p-3"
                  />
                  <Card.Body>
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
