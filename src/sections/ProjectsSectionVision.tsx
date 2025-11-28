import { motion } from "framer-motion";
import ProjectCarousel3D from "../components/projects/visionCarousel/ProjectCarousel3D";
import { projects } from "../data/projects";

export const ProjectsSectionVision = () => {
  return (
    <section className="py-32 flex flex-col items-center transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <ProjectCarousel3D projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsSectionVision;

