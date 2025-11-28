import { AnimatedPage } from '../components/AnimatedPage';
import { Hero } from '../components/Hero';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';

export const Home = () => {
  return (
    <AnimatedPage>
      <Hero />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <AboutCard />
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gradient text-center">
          Skills & Technologies
        </h2>
        <SkillsGrid />
      </section>
    </AnimatedPage>
  );
};

