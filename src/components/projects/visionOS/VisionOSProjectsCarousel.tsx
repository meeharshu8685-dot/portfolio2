import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Project } from "../../../data/projects";
import { siteData } from "../../../data/siteData";

interface VisionOSProjectsCarouselProps {
  projects?: Project[];
}

export const VisionOSProjectsCarousel: React.FC<VisionOSProjectsCarouselProps> = ({
  projects = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);

  // Calculate card transforms based on position relative to active index
  const getCardTransform = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    // Center card
    if (offset === 0) {
      return {
        scale: 1,
        rotateY: 0,
        x: 0,
        z: 150,
        opacity: 1,
        blur: 0,
        zIndex: 50,
      };
    }

    // Immediate left/right cards
    if (absOffset === 1) {
      return {
        scale: 0.75,
        rotateY: offset > 0 ? -25 : 25,
        x: offset * 200,
        z: 0,
        opacity: 0.6,
        blur: 4,
        zIndex: 20,
      };
    }

    // Cards further away
    return {
      scale: 0.6,
      rotateY: offset > 0 ? -40 : 40,
      x: offset * 250,
      z: -200,
      opacity: 0.3,
      blur: 12,
      zIndex: 10,
    };
  };

  // Handle drag end - snap to nearest card
  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);

    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (info.offset.x < 0 && activeIndex < projects.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }

    // Reset drag position
    x.set(0);
  };

  // Animate to active index
  useEffect(() => {
    x.set(0);
  }, [activeIndex, x]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight" && activeIndex < projects.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, projects.length]);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-white/60">No projects available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      {/* 3D Perspective Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Drag Container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: xSpring }}
        >
          {/* Project Cards */}
          {projects.map((project, index) => {
            const transform = getCardTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                className="absolute w-[380px] h-[520px] rounded-3xl overflow-hidden flex flex-col"
                style={{
                  scale: transform.scale,
                  rotateY: transform.rotateY,
                  x: transform.x,
                  z: transform.z,
                  opacity: transform.opacity,
                  filter: `blur(${transform.blur}px)`,
                  zIndex: transform.zIndex,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.15)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                onClick={() => !isDragging && setActiveIndex(index)}
                whileHover={isActive ? { scale: 1.02 } : {}}
              >
                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full p-6 text-white">
                  {/* Project Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 h-[260px]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/380x260/4f46e5/ffffff?text=${encodeURIComponent(project.name)}`;
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-semibold mt-4 mb-2 text-white">
                    {project.name}
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm text-white/70 mt-2 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80 border border-white/10">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Visit Link */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-300 hover:text-blue-200 hover:underline transition-colors flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Project
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>

                {/* Subtle Glow Effect for Active Card */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-white scale-125 w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Info Pill - Vision Pro Style */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full px-5 py-2 flex items-center gap-3 border border-white/20 shadow-lg z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <img
          src="/assets/profile.jpg"
          alt={siteData.name}
          className="w-8 h-8 rounded-full object-cover border border-white/20"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div className="text-sm">
          <p className="font-semibold text-white">{siteData.name}</p>
          <p className="text-xs text-white/60">{siteData.title}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default VisionOSProjectsCarousel;

