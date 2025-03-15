import { useEffect,useState } from "react";
import { Container,Alert,Accordion, } from "react-bootstrap";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Apropos() {
  const [loading,setLoading]=useState(true)
  const [skills,setSkills]=useState(null)
  const [error,setError]=useState('')
  const [activeKey,setActiveKey]=useState(null)
useEffect(()=>{
    const fetchSkills=async()=>{
      try{
        const response=await fetch(`${API_URL}/api/skills`)
        if(!response.ok){
          throw new Error('Compétences non trouvées')
        }
        console.log(response)
        const data=await response.json()
        console.log(data)
        setLoading(false)
        setSkills(data)

      }catch(err){
        setLoading(false)
        setError(err.message)

      }
  }
  fetchSkills()
},[])
if(error) return <Alert variant='danger'>{error}</Alert>
if(!skills) return <Alert variant='warning'>Compétences introuvables</Alert>

  return <>
  <Container>
    <h1 className="mt-4">Mes Compétences</h1>
    <p className="px-4 fs-4 mt-4">
    Après une riche expérience dans la gestion d’équipes et le suivi d’activités techniques dans les secteurs de l’énergie et de l’eau, j’ai choisi d’orienter mon parcours vers une voie qui allie rigueur analytique et créativité : le développement web. Passionné par l’optimisation des processus et la création d’outils numériques, je mets aujourd’hui mes compétences en programmation au service de solutions performantes et intuitives. Mon expertise en reporting et en gestion de données, combinée à mes compétences en développement full-stack, me permet de concevoir des applications adaptées aux besoins des entreprises et des utilisateurs.<br/>

Curieux de nature et toujours en quête d’amélioration, j’aime relever de nouveaux défis techniques et apprendre de chaque projet. En dehors du code, vous me croiserez peut-être en train de naviguer sur l’eau ou de pédaler sur les sentiers bretons ! À travers ce portfolio, je vous invite à découvrir mes projets et mon approche du développement web.
    </p>
    <Accordion activeKey={activeKey} onSelect={(key)=>setActiveKey(key)}>
      {skills.map((skill)=>(
      <Accordion.Item key={skill.categorie} eventKey={skill.categorie}>
        <Accordion.Header>
          {skill.categorie}
        </Accordion.Header>
        <Accordion.Body>
        {skill.skills.map((skill)=>(
          <p key={skill}>{skill}</p>
        ))}
        <Link>{skill.projets}</Link>
        </Accordion.Body>
      </Accordion.Item>))}
    </Accordion>
  </Container>
  </>;
}
export default Apropos;
