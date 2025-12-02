import { AnimatedPage } from '../components/AnimatedPage';
import { Hero } from '../components/Hero';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';
import ScaleTiltReveal from '../components/scroll/ScaleTiltReveal';

export const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden home-hero-gradient">
      <AnimatedPage>
        <Hero />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="p-6 sm:p-10">
              <ScaleTiltReveal maxTilt={14}>
                <AboutCard />
              </ScaleTiltReveal>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="p-6 sm:p-10">
              <ScaleTiltReveal maxTilt={12}>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
                  Skills & Technologies
                </h2>
              </ScaleTiltReveal>
              <SkillsGrid />
            </div>
          </div>
        </section>
      </AnimatedPage>
    </div>
  );
};

