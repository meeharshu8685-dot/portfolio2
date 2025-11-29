import { motion } from "framer-motion";
import VisionOSProjectsCarousel from "../components/projects/visionOS/VisionOSProjectsCarousel";
import { projects } from "../data/projects";

export const ProjectsSection: React.FC = () => {
  return (
    <section className="py-32 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gradient"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <VisionOSProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsSection;

