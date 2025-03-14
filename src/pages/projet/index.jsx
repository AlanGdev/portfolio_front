import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Alert,
  Card,
  Button,
  Carousel,
  Image,
} from 'react-bootstrap';
import './index.css';
const API_URL = import.meta.env.VITE_API_URL;

function Projet() {
  const { id } = useParams();
  console.log(id);
  const [projet, setProjet] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Projet non trouvé');
        }
        console.log('réponse reçue getOne project');
        const data = await response.json();
        setLoading(false);
        setProjet(data);
      } catch (err) {
        setLoading(false);

        setError(err.message);
      }
    };

    fetchProjet();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!projet) {
    return <Alert variant="warning">Projet introuvable</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Projet {projet.nom}</h2>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Card className="shadow-sm">
        {projet.image && (
          <div>
            <Card.Img
              variant="top"
              src={projet.image}
              alt={projet.nom}
              className="card-image "
            />
          </div>
        )}
        <Card.Body className="">
          <Card.Text>{projet.description}</Card.Text>
          <div>
            <strong>Catégorie :</strong> {projet.categorie}
          </div>
          <div>
            <strong>Technologies :</strong> {projet.technologies.join(', ')}
          </div>
          <div className="mt-3">
            <a
              href={projet.lien_github}
              target="_blank"
              className="btn btn-primary"
            >
              Voir sur GitHub
            </a>
            {projet.lien_demo && (
              <a
                href={projet.lien_demo}
                target="_blank"
                className="btn btn-secondary ms-2"
              >
                Voir la Démo
              </a>
            )}
          </div>
        </Card.Body>
      </Card>
      {projet.images_detail && (
        <Carousel>
          {projet.images_detail.map((image) => (
            <Carousel.Item>
              <Image src={image} className="d-block mx-auto" />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
}

export default Projet;
