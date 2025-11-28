import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';

export const SkillsGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {siteData.skills.map((skill) => (
        <motion.div
          key={skill}
          variants={itemVariants}
          className="glass rounded-lg p-4 text-center transition-all duration-300 cursor-default hover:opacity-90"
          style={{ color: 'var(--text-primary)' }}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
          }}
        >
          <span className="font-medium">{skill}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

