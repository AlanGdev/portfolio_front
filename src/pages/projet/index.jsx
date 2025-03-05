import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Card, Button } from 'react-bootstrap';

function Projet() {
  const { id } = useParams();
  console.log(id);
  const [projet, setProjet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/projects/${id}`
        );
        if (!response.ok) {
          throw new Error('Projet non trouvé');
        }
        console.log('réponse reçue getOne project');
        const data = await response.json();
        setProjet(data);
      } catch (err) {
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
      <h2 className="text-center mb-4">{projet.nom}</h2>
      <Card className="shadow-sm">
        {projet.image && (
          <Card.Img variant="top" src={projet.image} alt={projet.nom} />
        )}
        <Card.Body>
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
    </Container>
  );
}

export default Projet;
