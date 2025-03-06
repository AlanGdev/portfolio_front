import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Admin = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="text-center mt-5">
      <h2>Espace Admin</h2>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="primary" onClick={() => navigate('/admin/add-skill')}>
          Ajouter une compétence
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate('/admin/add-project')}
        >
          Ajouter un projet
        </Button>
        <Button variant="primary" onClick={() => navigate('/admin/add-techno')}>
          Ajouter une techno
        </Button>
      </div>
    </Container>
  );
};

export default Admin;
