import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Dock from './components/Dock';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
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
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasShownSplash(true);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <ThemeProvider>
      {showSplash && !hasShownSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {/* Animated background effects */}
        <AnimatedBackground />

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

