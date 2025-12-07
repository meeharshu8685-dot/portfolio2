import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { siteData } from '../data/siteData';
import ScaleTiltReveal from './scroll/ScaleTiltReveal';

export const Hero = () => {
  const hasResume = false; // Set to true when resume is uploaded
  const navigate = useNavigate();
  const typedRef = useRef<HTMLSpanElement>(null);
  const titleTypedRef = useRef<HTMLSpanElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const titleTypedInstanceRef = useRef<Typed | null>(null);

  // Initialize Typed.js for rotating titles
  useEffect(() => {
    if (titleTypedRef.current && !titleTypedInstanceRef.current) {
      titleTypedInstanceRef.current = new Typed(titleTypedRef.current, {
        strings: [
          'Building. Learning. Improving — One Project at a Time.',
          'A Student Developer Crafting Smooth, Modern UI',
          'Focused on Clean Design and Real-World Web Projects',
          'Learning Web Development Through Real Creating',
          'Growing as a Developer by Building Real Products',
          'Bringing Ideas to Life Through Code — Still Learning, Always Improving',
          'Developing Web Projects That Feel Clean and Professional',
          'Student Developer Exploring the Art of UI',
          'Learning Web Dev by Building Real Experiences',
        ],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 2000,
        startDelay: 300,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }

    return () => {
      if (titleTypedInstanceRef.current) {
        titleTypedInstanceRef.current.destroy();
        titleTypedInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize Typed.js typing animation for roles
  useEffect(() => {
    if (typedRef.current && !typedInstanceRef.current) {
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: [
          'AI/ML Engineer',
          'Developer',
          'Builder',
          'Student @ BITS Pilani',
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 600,
        loop: true,
        showCursor: false,
      });
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/projects');
    }
  };

  return (
    <section className="relative min-h-screen w-full px-6 pt-24 transition-colors duration-300">
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 gap-12 items-center">
        {/* Text + Typing Animation */}
        <ScaleTiltReveal maxTilt={15} className="text-left">
          <div>
            {/* Rotating Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 min-h-[7rem] sm:min-h-[5rem]">
              <span
                ref={titleTypedRef}
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
              ></span>
            </h1>

            {/* Typing Animation for roles */}
            <p
              className="text-xl md:text-2xl font-semibold mb-6 min-h-[2rem] transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span ref={typedRef}></span>
            </p>

            {/* Description */}
            <p
              className="text-lg sm:text-xl mb-8 max-w-xl transition-colors duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              {siteData.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={scrollToProjects}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects →
              </motion.button>
              {hasResume && (
                <motion.a
                  href={siteData.resumePath}
                  download
                  className="px-8 py-3 glass rounded-lg font-semibold text-lg transition-all text-center hover:opacity-90"
                  style={{ color: 'var(--text-primary)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>
              )}
            </div>
          </div>
        </ScaleTiltReveal>
      </div>
    </section>
  );
};
