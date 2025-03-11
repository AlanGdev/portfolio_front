import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import Accueil from './pages/accueil';
import Apropos from './pages/apropos';
import Projets from './pages/projets';
import Projet from './pages/projet';
import Contact from './pages/contact';
import Admin from './pages/admin';
import AddSkill from './pages/addSkill';
import AddProject from './pages/addProject';
import AddTechno from './pages/addTechno';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div
      className={
        darkMode
          ? 'bg-dark text-light min-vh-100'
          : 'bg-light text-dark min-vh-100'
      }
    >
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        {isAuthenticated && (
          <div className="text-center mt-3">
            <Button variant="danger" onClick={handleLogout}>
              Se Déconnecter
            </Button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Accueil darkMode={darkMode} />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/projets" element={<Projets darkMode={darkMode} />} />
          <Route path="/projets/:id" element={<Projet />} />
          <Route path="/contact" element={<Contact />} />
          {isAuthenticated && (
            <>
              <Route
                path="/admin"
                element={<Admin isAuthenticated={isAuthenticated} />}
              />
              <Route path="/admin/add-skill" element={<AddSkill />} />
              <Route path="/admin/add-project" element={<AddProject />} />
              <Route path="/admin/add-techno" element={<AddTechno />} />
            </>
          )}
        </Routes>
        <Footer
          onLogin={() => setIsAuthenticated(true)}
          darkMode={darkMode}
          isAuthenticated={isAuthenticated}
        />
      </Router>
    </div>
  );
}

export default App;
