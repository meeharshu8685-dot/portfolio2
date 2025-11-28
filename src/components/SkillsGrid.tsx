import { motion } from 'framer-motion';
import { skillsWithIcons } from '../data/skillsWithIcons';
import SkillCard3D from './skills/SkillCard3D';

export const SkillsGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {skillsWithIcons.map((skill, index) => (
        <SkillCard3D
          key={skill.id}
          icon={skill.icon}
          name={skill.name}
          description={skill.description}
          index={index}
          glowColor={skill.glowColor}
        />
      ))}
    </motion.div>
  );
};

