import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
function accueilCarousel() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/projects');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        err.message;
      }
    };
    fetchProjects();
  }, []);
  return (
    <Carousel>
      {projects.map((project) => {
        <Carousel.Item>
          <img src={project.image} alt={project.nom} />
          <Carousel.caption>
            <h3>{project.nom}</h3>
            <p>{project.categorie}</p>
          </Carousel.caption>
        </Carousel.Item>;
      })}
    </Carousel>
  );
}
export default accueilCarousel;
