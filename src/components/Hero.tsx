import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import { siteData } from '../data/siteData';
import SpiderBlinkClimbLook from './SpiderBlinkClimbLook';

export const Hero = () => {
  const hasResume = false; // Set to true when resume is uploaded
  const navigate = useNavigate();
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);

  // Initialize Typed.js typing animation
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
    <section className="min-h-screen w-full bg-[#0d0d0d] px-6 pt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - Text + Typing Animation */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {siteData.name}
            </span>
          </motion.h1>

          {/* Typing Animation */}
          <motion.p
            className="text-xl md:text-2xl font-semibold text-gray-300 mt-3 mb-6 min-h-[2rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span ref={typedRef}></span>
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {siteData.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects →
            </motion.button>
            {hasResume && (
              <motion.a
                href={siteData.resumePath}
                download
                className="px-8 py-3 glass text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Spider Animation */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <SpiderBlinkClimbLook size={96} maxClimb={220} />
        </motion.div>
      </div>
    </section>
  );
};
