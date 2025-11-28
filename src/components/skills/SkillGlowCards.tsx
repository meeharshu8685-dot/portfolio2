import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import {
  FaPython,
  FaReact,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  python: FaPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: FaReact,
  tailwind: SiTailwindcss,
  git: FaGitAlt,
};

// Glow color mapping for box-shadow
const glowColorMap: Record<string, string> = {
  python: 'rgba(251, 191, 36, 0.5)', // yellow-400
  javascript: 'rgba(250, 204, 21, 0.5)', // yellow-400
  typescript: 'rgba(96, 165, 250, 0.5)', // blue-400
  react: 'rgba(96, 165, 250, 0.5)', // blue-400
  tailwind: 'rgba(56, 189, 248, 0.5)', // cyan-400
  git: 'rgba(248, 113, 113, 0.5)', // red-400
};

export const SkillGlowCards = () => {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            const glowColor = glowColorMap[skill.icon] || 'rgba(168, 85, 247, 0.5)';

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  rotate: [0, 0.5, -0.5, 0],
                  boxShadow: `0px 0px 25px ${glowColor}`,
                  transition: { duration: 0.4 },
                }}
                className="relative"
              >
                {/* Glow Border */}
                <div
                  className={`relative before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-r ${skill.glow} before:opacity-80 before:-z-[1]`}
                >
                  {/* Inner Card */}
                  <div className="bg-[#0b0b0b] rounded-2xl p-6 shadow-[0_0_18px_rgba(168,85,247,0.45)]">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      {IconComponent && (
                        <IconComponent className="w-12 h-12 text-white" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 text-center">
                      {skill.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm text-center leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

