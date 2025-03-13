import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Carousel,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Image,
  Button,
} from 'react-bootstrap';
import './index.css';
import imageAlan from '../../assets/alan1.webp';
const API_URL = import.meta.env.VITE_API_URL;

function Accueil({ darkMode }) {
  const [technologies, setTechnologies] = useState([]);
  const [projets, setProjets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch(`${API_URL}/api/techno`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des technologies');
        }
        const data = await response.json();
        setLoading(false);
        console.log(" Données reçues de l'API :", data);
        setTechnologies(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        setLoading(false);
        console.log(" Données reçues de l'API :", data);
        setProjets(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchProjets();
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
    <>
      <Container fluid>
        <h1 className="px-3">
          Des applications web sur mesure pour booster votre activité
        </h1>
        <div className="d-flex">
          <Row className="flex-column-reverse flex-md-row align-items-center">
            <Col
              xs={12}
              md={8}
              className="d-flex flex-column justify-content-center"
            >
              <p className="p-5 fs-4">
                Développeur web freelance, je conçois des sites et applications
                modernes, performants et évolutifs. Que ce soit pour un site
                vitrine, une application métier ou une optimisation SEO, je vous
                accompagne avec des solutions adaptées à vos besoins.
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant={darkMode ? 'outline-success' : 'outline-success'}
                  className=""
                  onClick={() => navigate('/contact')}
                >
                  Contactez-moi
                </Button>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <Image
                src={imageAlan}
                alt="Alan Grolleau"
                className=" imageAlan d-none d-sm-block w-sm-50 w-md-100 rounded-5 m-auto"
                style={{ objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </div>
      </Container>

      <Container>
        <h2 className="text-center mt-5"> Projets </h2>
        <Carousel
          controls={false}
          indicators={false}
          data-bs-theme="dark"
          interval={3500}
          className="mt-5"
        >
          {projets.map((projet) => {
            return (
              <Carousel.Item key={projet._id}>
                <div className="d-flex carousel-item">
                  <Image
                    loading="lazy"
                    src={projet.image}
                    alt={projet.nom}
                    className="mx-auto carousel-img"
                    onClick={() => {
                      navigate('/projets');
                    }}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>

      <Container className="mt-5">
        <h2 className="text-center mb-4">Technologies utilisées</h2>
        {loading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {Object.keys(domaines).map((domaine) => (
          <div key={domaine} className="mb-4">
            <h3
              className={`${darkMode ? 'text-light mb-4' : 'text-dark mb-4'}`}
            >
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
                      loading="lazy"
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
    </>
  );
}

export default Accueil;
