import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import { siteData } from '../data/siteData';
import * as THREE from 'three';

// Floating Laptop Component
const FloatingLaptop = () => {
  const laptopRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={laptopRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Laptop Base */}
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
            emissive="#4f46e5"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.5, -0.9]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
            emissive="#6366f1"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Hologram Code Panel */}
        <Html
          position={[0, 0.5, -0.85]}
          rotation={[-0.3, 0, 0]}
          transform
          occlude
          distanceFactor={1.5}
        >
          <div className="glass-code-panel">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-title">main.tsx</span>
            </div>
            <div className="code-content">
              <pre>
                <code>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">developer</span> = {'{'}
                  <br />
                  {'  '}
                  <span className="code-property">name</span>:{' '}
                  <span className="code-string">'Harsh'</span>,
                  <br />
                  {'  '}
                  <span className="code-property">role</span>:{' '}
                  <span className="code-string">'AI/ML Engineer'</span>,
                  <br />
                  {'  '}
                  <span className="code-property">passion</span>:{' '}
                  <span className="code-string">'Building'</span>
                  <br />
                  {'}'};
                </code>
              </pre>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Floating Cubes Component
const FloatingCubes = () => {
  const cubes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ] as [number, number, number],
    speed: 0.5 + Math.random() * 0.5,
  }));

  return (
    <>
      {cubes.map((cube) => (
        <Float
          key={cube.id}
          speed={cube.speed}
          rotationIntensity={1}
          floatIntensity={0.5}
        >
          <mesh
            position={cube.position}
            rotation={cube.rotation}
            castShadow
          >
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color={cube.id % 2 === 0 ? '#6366f1' : '#8b5cf6'}
              metalness={0.7}
              roughness={0.3}
              emissive={cube.id % 2 === 0 ? '#6366f1' : '#8b5cf6'}
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#6366f1"
        castShadow
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.8}
        color="#8b5cf6"
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#6366f1" />

      {/* 3D Objects */}
      <FloatingLaptop />
      <FloatingCubes />

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />

      {/* Environment */}
      <Environment preset="night" />
    </Canvas>
  );
};

// Main Hero Component
export const Hero3DDeveloper = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const navigate = useNavigate();
  const hasResume = false; // Set to true when resume is uploaded

  useEffect(() => {
    if (typedRef.current && !typedInstanceRef.current) {
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: [
          'AI/ML Engineer',
          'Developer',
          'Builder',
          'Student @ BITS Pilani',
        ],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: false,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Harsh </span>
              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                Vishwakarma
              </span>
            </motion.h1>

            <motion.div
              className="h-16 sm:h-20 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span
                ref={typedRef}
                className="text-2xl sm:text-3xl md:text-4xl text-white/80 font-medium"
              />
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I build visually stunning, interactive, and intelligent digital
              experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/50"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects →
              </motion.button>
              {hasResume && (
                <motion.a
                  href={siteData.resumePath}
                  download
                  className="px-8 py-4 glass text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Scene */}
          <motion.div
            className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Scene3D />
          </motion.div>
        </div>
      </div>

      {/* Custom Styles for Code Panel */}
      <style>{`
        .glass-code-panel {
          background: rgba(15, 15, 15, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 8px;
          padding: 16px;
          width: 280px;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2);
        }

        .code-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }

        .code-dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot.red {
          background: #ef4444;
        }

        .dot.yellow {
          background: #f59e0b;
        }

        .dot.green {
          background: #10b981;
        }

        .code-title {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-family: 'Inter', monospace;
        }

        .code-content {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.6;
        }

        .code-content pre {
          margin: 0;
          color: #e5e7eb;
        }

        .code-keyword {
          color: #c792ea;
        }

        .code-variable {
          color: #82aaff;
        }

        .code-property {
          color: #7fdbca;
        }

        .code-string {
          color: #c3e88d;
        }

        .typed-fade-out {
          opacity: 0;
          transition: opacity 0.5s;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

