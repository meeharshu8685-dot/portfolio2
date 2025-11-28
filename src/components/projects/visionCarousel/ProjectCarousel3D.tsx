import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Project } from "../../../data/projects";

interface ProjectCarousel3DProps {
  projects?: Project[];
}

export const ProjectCarousel3D: React.FC<ProjectCarousel3DProps> = ({
  projects = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 18 };
  const xSpring = useSpring(x, springConfig);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < projects.length) {
      setActiveIndex(index);
      x.set(0);
    }
  }, [projects.length, x]);

  // Navigate to next card
  const goToNext = useCallback(() => {
    if (activeIndex < projects.length - 1) {
      goToIndex(activeIndex + 1);
    }
  }, [activeIndex, projects.length, goToIndex]);

  // Navigate to previous card
  const goToPrevious = useCallback(() => {
    if (activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
  }, [activeIndex, goToIndex]);

  // Calculate card positions
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    if (absOffset > 1) {
      // Cards beyond immediate neighbors are hidden
      return {
        scale: 0.5,
        rotateY: offset > 0 ? 35 : -35,
        x: offset * 200,
        z: -500,
        opacity: 0,
        filter: "blur(20px)",
      };
    }

    if (offset === 0) {
      // Center card
      return {
        scale: 1,
        rotateY: 0,
        x: 0,
        z: 0,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 50,
      };
    }

    // Side cards
    return {
      scale: 0.75,
      rotateY: offset > 0 ? -25 : 25,
      x: offset * 180,
      z: -200,
      opacity: 0.5,
      filter: "blur(8px)",
      zIndex: 10 - absOffset,
    };
  };

  // Handle drag end - snap to nearest card
  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    const threshold = 80;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    // Reset drag position
    x.set(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToIndex(projects.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeIndex, projects.length, goToNext, goToPrevious, goToIndex]);

  // Mouse wheel scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Throttle scroll events
      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          goToNext();
        } else if (e.deltaY < 0) {
          goToPrevious();
        }
      }, 100);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [goToNext, goToPrevious]);

  if (projects.length === 0) {
    return <div className="text-center text-white/70">No projects available</div>;
  }

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      role="region"
      aria-label="Projects carousel"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Navigation Arrow - Previous */}
      <button
        onClick={goToPrevious}
        disabled={activeIndex === 0}
        className="absolute left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "var(--text-primary)",
        }}
        aria-label="Previous project"
        aria-disabled={activeIndex === 0}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Navigation Arrow - Next */}
      <button
        onClick={goToNext}
        disabled={activeIndex === projects.length - 1}
        className="absolute right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "var(--text-primary)",
        }}
        aria-label="Next project"
        aria-disabled={activeIndex === projects.length - 1}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 3D Perspective Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "50% 50%",
        }}
        tabIndex={0}
        role="group"
        aria-label={`Project ${activeIndex + 1} of ${projects.length}`}
      >
        {/* Cards Container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.3}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onDrag={(_event, info) => {
            x.set(info.offset.x);
          }}
          style={{ x: xSpring }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                className="absolute w-[400px] h-[500px] cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                initial={false}
                animate={{
                  scale: style.scale,
                  rotateY: style.rotateY,
                  x: style.x,
                  z: style.z,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                  mass: 0.8,
                }}
                style={{
                  zIndex: style.zIndex,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (!isDragging) {
                    goToIndex(index);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToIndex(index);
                  }
                }}
                whileHover={isActive ? { scale: 1.02 } : {}}
                tabIndex={isActive ? 0 : -1}
                role="button"
                aria-label={`View ${project.name} project`}
                aria-pressed={isActive}
              >
                {/* Glassmorphism Card */}
                <div
                  className="w-full h-full rounded-3xl p-6 flex flex-col relative overflow-hidden"
                  style={{
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: isActive
                      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
                      : "0 8px 32px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%)",
                    }}
                  />

                  {/* Project Image */}
                  <div className="relative z-10 mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/4f46e5/ffffff?text=${encodeURIComponent(project.name)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Project Title */}
                  <h3
                    className="text-xl font-semibold mb-2 relative z-10 transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.name}
                  </h3>

                  {/* Project Description */}
                  <p
                    className="text-sm mb-4 flex-grow relative z-10 transition-colors duration-300 line-clamp-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 rounded-md text-xs transition-colors duration-300"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span
                        className="px-2 py-1 rounded-md text-xs transition-colors duration-300"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Visit Link */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-medium relative z-10 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Project →
                  </a>

                  {/* Light reflection on edges */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation Dots */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-50"
          role="tablist"
          aria-label="Project navigation"
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                index === activeIndex
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50 w-2"
              }`}
              aria-label={`Go to project ${index + 1}: ${projects[index]?.name}`}
              aria-selected={index === activeIndex}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
            />
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="rounded-full px-4 py-2 flex items-center gap-3 text-sm transition-colors duration-300"
          style={{
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            color: "var(--text-primary)",
          }}
        >
          <span className="font-medium">Project Author:</span>
          <span>Harsh Vishwakarma</span>
          <span className="text-white/50">•</span>
          <span className="font-medium">Role:</span>
          <span>Developer</span>
          <span className="text-white/50">•</span>
          <span className="font-medium">Location:</span>
          <span>India</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCarousel3D;

