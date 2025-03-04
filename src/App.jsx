import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Accueil from './pages/accueil';
import Apropos from './pages/apropos';
import Projets from './pages/projets';
import Projet from './pages/projet';
import Contact from './pages/contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);
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
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/projets/:id" element={<Projet />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
