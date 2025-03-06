import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTechnology = () => {
  const [nom, setNom] = useState('');
  const [image, setImage] = useState(null);
  const [domaine, setDomaine] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être authentifié pour ajouter une technologie.');
      return;
    }

    if (!nom || !image || !domaine) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('image', image);
    formData.append('domaine', domaine);

    try {
      const response = await fetch('http://localhost:4000/api/techno', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess('Technologie ajoutée avec succès !');
      setNom('');
      setImage(null);
      setDomaine('');

      setTimeout(() => {
        navigate('/admin'); // Redirection vers la page d’administration
      }, 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Ajouter une Technologie</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Nom de la Technologie</Form.Label>
          <Form.Control
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image de la Technologie</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Domaine</Form.Label>
          <Form.Select
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            required
          >
            <option value="">Sélectionner un domaine</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
            <option value="Full-Stack">Full-Stack</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter la Technologie
        </Button>
      </Form>
    </Container>
  );
};

export default AddTechnology;
