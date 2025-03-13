import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL;

function Message() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Vous devez être authentifié pour lire les messages.');
      return;
    }

    const fetchMessages = async () => {
      if (!token) {
        setError('Vous devez être authentifié pour lire les messages.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des messages');
        }
        const data = await response.json();
        setLoading(false);
        setMessages(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Messages</h1>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {messages.map((message) => (
        <Container key={message._id} className="mb-4 border">
          <Row>
            <Col>{message.createdAt}</Col>
          </Row>
          <Row>
            <Col>{message.nom}</Col>
            <Col>{message.email}</Col>
          </Row>
          <Row>
            <Col>{message.message}</Col>
          </Row>
        </Container>
      ))}
    </>
  );
}
export default Message;
