import { motion } from 'framer-motion';
import { experienceTimeline } from '../../data/experienceTimeline';

export const ExperienceTimeline = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = (index: number) => ({
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-gradient text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experienceTimeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants(index)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 z-10">
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Card */}
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2" />
                  <motion.div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8' : 'pl-8'
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="glass rounded-xl p-6 transition-all duration-300 hover:opacity-90">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-purple-400 font-bold text-lg">
                          {item.year}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="mb-4 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

