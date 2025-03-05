import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [lienGithub, setLienGithub] = useState('');
  const [lienDemo, setLienDemo] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être authentifié pour ajouter un projet.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom,
          description,
          categorie,
          lien_github: lienGithub,
          lien_demo: lienDemo,
          technologies,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess('Projet ajouté avec succès!');
      setNom('');
      setDescription('');
      setCategorie('');
      setLienGithub('');
      setLienDemo('');
      setTechnologies([]);

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  const handleAddTechnology = () => {
    if (newTech.trim() != '') {
      setTechnologies([...technologies, newTech.trim()]);
    }
  };
  return (
    <Container className="mt-4">
      <h2 className="text-center">Ajouter un Projet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom du projet</Form.Label>
          <Form.Control
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
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
          <Form.Label>Catégorie</Form.Label>
          <Form.Select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
            <option value="Full-Stack">Full-Stack</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lien GitHub</Form.Label>
          <Form.Control
            type="url"
            value={lienGithub}
            onChange={(e) => setLienGithub(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lien Démo (optionnel)</Form.Label>
          <Form.Control
            type="url"
            value={lienDemo}
            onChange={(e) => setLienDemo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Technologies utilisées</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Ajouter une technologie"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
            />
            <Button
              variant="success"
              className="ms-2"
              onClick={handleAddTechnology}
            >
              +
            </Button>
          </div>
          <ul className="mt-2">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter le Projet
        </Button>
      </Form>
    </Container>
  );
};
export default AddProject;
