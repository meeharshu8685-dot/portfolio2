import { AnimatedPage } from '../components/AnimatedPage';
import { Hero } from '../components/Hero';
import { AboutCard } from '../components/AboutCard';
import { SkillsGrid } from '../components/SkillsGrid';
import ScaleTiltReveal from '../components/scroll/ScaleTiltReveal';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';

export const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-page liquid background */}
      <LiquidEffectAnimation />

      {/* Foreground content */}
      <div className="relative z-10">
        <AnimatedPage>
          <Hero />
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <ScaleTiltReveal maxTilt={14}>
              <AboutCard />
            </ScaleTiltReveal>
          </section>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <ScaleTiltReveal maxTilt={12}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
                Skills & Technologies
              </h2>
            </ScaleTiltReveal>
            <SkillsGrid />
          </section>
        </AnimatedPage>
      </div>
    </div>
  );
};

