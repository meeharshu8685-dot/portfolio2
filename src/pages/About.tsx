import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedPage } from '../components/AnimatedPage';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';
import { ExperienceTimeline } from '../components/about/ExperienceTimeline';
import { SkillsProgressBars } from '../components/skills/SkillsProgressBars';
import { ThemeSelector } from '../components/ThemeSelector';

export const About = () => {
  return (
    <AnimatedPage>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h1>
          <AboutCard />
        </div>
      </section>

      <ExperienceTimeline />

      <SkillsProgressBars />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
          Skills & Technologies
        </h2>
        <SkillsGrid />
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Education
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                Bachelors in Computer Science
              </h3>
              <p className="transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>BITS Pilani (Ongoing)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Link */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/roadmap">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto cursor-pointer border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
                  🗺️ View My Roadmap
                </h3>
                <p className="transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                  Check out my learning journey, goals, and upcoming projects
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-3xl hidden md:block"
                style={{ color: 'var(--text-primary)' }}
              >
                →
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Theme Selector */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient text-center">
            Choose Your Theme
          </h2>
          <ThemeSelector />
        </div>
      </section>
    </AnimatedPage>
  );
};

