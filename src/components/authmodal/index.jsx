import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const AuthModal = ({ show, handleClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Stocke directement la réponse JSON
      console.log('Réponse reçue :', data); // Debug

      if (!response.ok) {
        throw new Error(data.message || "Erreur d'authentification");
      }

      if (!data.token) {
        throw new Error("Token non reçu après connexion.");
      }

      // Stocker le token dans le localStorage
      localStorage.setItem('token', data.token);
      console.log('Token stocké :', localStorage.getItem('token')); // Vérification

      // Exécuter les actions post-login
      onLogin();
      handleClose();
      navigate('/admin');

    } catch (err) {
      console.error('Erreur détectée :', err.message);
      setError(err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Connexion Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Se connecter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;