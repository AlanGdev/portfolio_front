import { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Alert,
  Container,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const AddProject = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [lienGithub, setLienGithub] = useState('');
  const [lienDemo, setLienDemo] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [problematics, setProblematics] = useState([]);
  const [newProb, setNewProb] = useState('');
  const [image, setImage] = useState(null);
  const [imagesDetail, setImagesDetail] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  const getTechnos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/techno/`);
      console.log('status réponse: ', response.status);
      if (!response.ok) {
        setError('Problème dans la récupération des technologies');
        return;
      }
      const data = await response.json();
      setDatas(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getTechnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être authentifié pour ajouter un projet.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('categorie', categorie);
    formData.append('lien_github', lienGithub);
    formData.append('lien_demo', lienDemo);
    formData.append('image', image);
    formData.append('problematics', JSON.stringify(problematics));
    formData.append('technologies', JSON.stringify(technologies));
    imagesDetail.forEach((img) => formData.append('images_detail', img));
    console.log(formData);

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'une erreur est survenue');
      }

      setSuccess('Projet ajouté avec succès!');
      setNom('');
      setDescription('');
      setCategorie('');
      setLienGithub('');
      setLienDemo('');
      setProblematics([]);
      setTechnologies([]);
      setImage(null);
      setImagesDetail([]);

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  const handleAddTechnology = () => {
    if (newTech.trim() !== '') {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };
  const handleAddProblematic = () => {
    if (newProb.trim() !== '') {
      setProblematics([...problematics, newProb.trim()]);
      console.log(problematics);
      setNewProb('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Ajouter un Projet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <FormGroup className="mb-3">
          <FormLabel>Problématiques & solutions</FormLabel>
          <div className="d-flex">
            <FormControl
              type="text"
              placeholder="Problématique & solution apportée"
              value={newProb}
              onChange={(e) => setNewProb(e.target.value)}
            />
            <Button
              variant="success"
              className="ms-2"
              onClick={handleAddProblematic}
            >
              +
            </Button>
          </div>
          <ul className="mt-2">
            {problematics.map((problematic, index) => (
              <li key={index}>{problematic}</li>
            ))}
          </ul>
        </FormGroup>

        <Form.Group className="mb-3">
          <Form.Label>Technologies utilisées</Form.Label>
          <div className="d-flex">
            <Form.Select
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
            >
              <option value="">Sélectionner une technologie</option>
              {datas.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.nom}
                </option>
              ))}
            </Form.Select>

            <Button
              variant="success"
              className="ms-2"
              onClick={handleAddTechnology}
            >
              +
            </Button>
          </div>
          <ul className="mt-2">
            {technologies.map((tech, index) => {
              const nomTech = datas.find((data) => data._id === tech);
              return <li key={index}>{nomTech.nom}</li>;
            })}
          </ul>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image principale du projet</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Images de détail</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setImagesDetail([...imagesDetail, ...e.target.files])
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter le Projet
        </Button>
      </Form>
    </Container>
  );
};

export default AddProject;
