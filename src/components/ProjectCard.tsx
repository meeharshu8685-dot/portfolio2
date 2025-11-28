import { motion } from 'framer-motion';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white/20">
            {project.name.charAt(0)}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-accent/20 text-accent rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/10 text-white/60 rounded">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

