import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/AnimatedPage';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';
import { ExperienceTimeline } from '../components/about/ExperienceTimeline';
import { SkillsProgressBars } from '../components/skills/SkillsProgressBars';

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
              <h3 className="text-xl font-semibold text-white mb-2">
                Bachelors in Computer Science
              </h3>
              <p className="text-white/70">BITS Pilani (Ongoing)</p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

