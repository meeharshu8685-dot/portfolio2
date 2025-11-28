import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillLevels, SkillLevel } from '../../data/skillLevels';

export const SkillsProgressBars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-gradient text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Proficiency
        </motion.h2>

        <div ref={ref} className="space-y-6">
          {skillLevels.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  skill: SkillLevel;
  index: number;
  isInView: boolean;
}

const SkillBar = ({ skill, index, isInView }: SkillBarProps) => {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-lg">{skill.name}</span>
        <motion.span
          className="text-purple-400 font-bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-lg shadow-purple-500/50"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.2,
            ease: 'easeOut',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    </motion.div>
  );
};

