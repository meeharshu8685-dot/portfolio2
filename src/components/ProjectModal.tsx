import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-label="Close modal"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 xl:inset-32 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
              <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
                <h2
                  id="project-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient flex-1"
                >
                  {project.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-2"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Project Image */}
              <div className="mb-4 sm:mb-6">
                <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden mb-4 sm:mb-6">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/800x600/4f46e5/ffffff?text=${encodeURIComponent(project.name)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>

              {/* Credits */}
              {project.credits && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-xs sm:text-sm font-semibold text-white/60 mb-1">
                    Credits
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    {project.credits}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 rounded-lg text-xs sm:text-sm font-medium border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Go Live Button */}
              <div className="flex gap-3 sm:gap-4">
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold overflow-hidden group w-full sm:w-auto text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Go Live
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

