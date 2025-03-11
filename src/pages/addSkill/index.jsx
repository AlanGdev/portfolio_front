import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
  const [categorie, setCategorie] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projets, setProjets] = useState([]);
  const [selectedProjets, setSelectedProjets] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => setProjets(data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des projets', error)
      );
  }, []);

  const handleAddSkill=()=>{
    if (newSkill.trim() !==''){
      setSkills([...skills,newSkill.trim()])
      setNewSkill('')
    }
  }

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être authentifié pour ajouter un projet.');
      return;
    }

    const newCompetence = {
      categorie,
      skills,
      projets: selectedProjets,
    };

    try {
      console.log (newCompetence)
      const response = await fetch(`${API_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(newCompetence),
      });

      const data=await response.json()
      if (!response.ok){
        throw new Error(data.message||"Erreur lors de l'ajout de la compétence");}

      setSuccess('Compétence ajoutée avec succès !');
      setCategorie('');
      setSkills([]);
      setSelectedProjets([]);
      setTimeout(() => {
        navigate('/admin');
      },2000)

    } catch (error) {
      setError(err.message || "Erreur lors de l'ajout");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Ajouter une Compétence</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Catégorie */}
        <Form.Group className="mb-3">
          <Form.Label>Catégorie</Form.Label>
          <Form.Select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Intégration Web">Intégration Web</option>
            <option value="Développement Front-end">
              Développement Front-end
            </option>
            <option value="Développement Back-end">
              Développement Back-end
            </option>
            <option value="Gestion de projets & Outils">
              Gestion de projets & Outils
            </option>
            <option value="Optimisation & Debug">Optimisation & Debug</option>
            <option value="Publication & Déploiement">
              Publication & Déploiement
            </option>
            <option value="Prochaines compétences à développer">
              Prochaines compétences à développer
            </option>
          </Form.Select>
        </Form.Group>

        {/* Sous-compétences (Skills) */}
        <Form.Group className="mb-3">
          <Form.Label>Compétences</Form.Label>
          <div className='d-flex'> 
                <Form.Control
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Ex: Utiliser React Router"
                />
          <Button variant="success" onClick={handleAddSkill}>
            +
          </Button>
          </div>
          <ul className="mt-2">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </Form.Group>

        {/* Sélection des projets */}
        <Form.Group className="mb-3">
          <Form.Label>Associer à des projets</Form.Label>
          <Form.Select
            multiple
            value={selectedProjets}
            onChange={(e) =>
              setSelectedProjets(
                [...e.target.selectedOptions].map((opt) => opt.value)
              )
            }
          >
            {projets.map((projet) => (
              <option key={projet._id} value={projet._id}>
                {projet.nom}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Bouton de soumission */}
        <Button variant="success" type="submit">
          Ajouter la Compétence
        </Button>
      </Form>
    </Container>
  );
};

export default AddSkill;
