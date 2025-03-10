import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
const API_URL = import.meta.env.VITE_API_URL;

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.nom || !formData.email || !formData.message) {
      setErrorMessage('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi du message.');
      }

      setSuccessMessage('Votre message a été envoyé avec succès !');
      setFormData({ nom: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Une question? Une demande de devis?</h2>
      <p className="text-center mb-2">
        N'hésitez pas à m'écrire! Je vous répondrai en moins de 24 heures
      </p>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message..."
            rows={4}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Envoyer
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
