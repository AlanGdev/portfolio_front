import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddSkill = () => {
  const [categorie, setCategorie] = useState('');
  const [skills, setSkills] = useState(['']);
  const [projets, setProjets] = useState([]);
  const [selectedProjets, setSelectedProjets] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Récupérer la liste des projets depuis l'API avec Fetch
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => setProjets(data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des projets', error)
      );
  }, []);

  // Ajouter un champ pour une nouvelle compétence
  const addSkillField = () => {
    setSkills([...skills, '']);
  };

  // Supprimer un champ de compétence
  const removeSkillField = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  // Mettre à jour une compétence dans le tableau
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSkill = {
      categorie,
      skills,
      projets: selectedProjets,
    };

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (!response.ok)
        throw new Error("Erreur lors de l'ajout de la compétence");

      alert('Compétence ajoutée avec succès !');
      setCategorie('');
      setSkills(['']);
      setSelectedProjets([]);
    } catch (error) {
      console.error(error);
      alert("Échec de l'ajout de la compétence.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Ajouter une Compétence</h2>
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
          {skills.map((skill, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Ex: Utiliser React Router"
                  required
                />
              </Col>
              <Col xs="auto">
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => removeSkillField(index)}
                  >
                    Supprimer
                  </Button>
                )}
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={addSkillField}>
            + Ajouter une compétence
          </Button>
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
