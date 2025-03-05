import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState('');
  const [niveau, setNiveau] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [projetNom, setProjetNom] = useState('');
  const [projetLien, setProjetLien] = useState('');
  const [projetsAssocies, setProjetsAssocies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être authentifié pour ajouter une compétence.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom,
          categorie,
          niveau,
          description,
          technologies,
          projets_associes: projetsAssocies,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess('Compétence ajoutée avec succès !');
      setNom('');
      setCategorie('');
      setNiveau('');
      setDescription('');
      setTechnologies([]);
      setProjetsAssocies([]);

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  const handleAddTechnology = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setTechnologies([...technologies, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const handleAddProjet = () => {
    if (projetNom.trim() && projetLien.trim()) {
      setProjetsAssocies([
        ...projetsAssocies,
        { nom: projetNom, lien_github: projetLien },
      ]);
      setProjetNom('');
      setProjetLien('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Ajouter une Compétence</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom de la compétence</Form.Label>
          <Form.Control
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Catégorie</Form.Label>
          <Form.Select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
            <option value="Outils & Workflow">Outils & Workflow</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Niveau</Form.Label>
          <Form.Select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            required
          >
            <option value="">Sélectionner un niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Technologies (Ajoutez avec Entrée)</Form.Label>
          <Form.Control
            type="text"
            onKeyDown={handleAddTechnology}
            placeholder="Ajoutez une technologie..."
          />
          <ul className="mt-2">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </Form.Group>

        <h5>Projets Associés</h5>
        <Row>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Nom du projet"
              value={projetNom}
              onChange={(e) => setProjetNom(e.target.value)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Lien GitHub"
              value={projetLien}
              onChange={(e) => setProjetLien(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="success" onClick={handleAddProjet}>
              +
            </Button>
          </Col>
        </Row>
        <ul className="mt-2">
          {projetsAssocies.map((projet, index) => (
            <li key={index}>
              {projet.nom} -{' '}
              <a
                href={projet.lien_github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {projet.lien_github}
              </a>
            </li>
          ))}
        </ul>

        <Button variant="primary" type="submit" className="mt-3">
          Ajouter la Compétence
        </Button>
      </Form>
    </Container>
  );
};

export default AddSkill;
