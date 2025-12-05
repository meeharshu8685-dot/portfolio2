import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Dock from './components/Dock';
import RoadmapButton from './components/RoadmapButton';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { AnimationsPage } from './pages/AnimationsPage';
import { Roadmap } from './pages/Roadmap';
import { FadeUpExample } from './pages/FadeUpExample';
import { Arsenal } from './pages/Arsenal';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <RoadmapButton />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/arsenal" element={<Arsenal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/animations" element={<AnimationsPage />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/fadeup-example" element={<FadeUpExample />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <Dock />
      </div>
    </ThemeProvider>
  );
}

export default App;

