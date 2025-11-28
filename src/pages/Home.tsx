import { AnimatedPage } from '../components/AnimatedPage';
import { Hero } from '../components/Hero';
import SpiderBlinkClimbLook from '../components/SpiderBlinkClimbLook';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';

export const Home = () => {
  return (
    <AnimatedPage>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Spider Component - positioned at top of hero */}
        <div className="absolute top-0 left-0 right-0 h-[300px] z-10 pointer-events-none">
          <SpiderBlinkClimbLook size={96} maxClimb={220} />
        </div>
        <Hero />
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AboutCard />
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
          Skills & Technologies
        </h2>
        <SkillsGrid />
      </section>
    </AnimatedPage>
  );
};

