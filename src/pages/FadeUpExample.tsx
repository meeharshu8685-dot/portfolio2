/**
 * FadeUp Animation Example Page
 * 
 * This page demonstrates the FadeUp scroll animation component
 * with example usage in About and Skills sections.
 * 
 * To run locally:
 * 1. Install dependencies: npm install
 * 2. Ensure framer-motion and tailwindcss are installed
 * 3. Run dev server: npm run dev
 * 4. Open http://localhost:5173/fadeup-example
 * 
 * To test reduced motion:
 * - Chrome DevTools: More Tools > Rendering > Emulate CSS media feature prefers-reduced-motion
 * - Firefox DevTools: Settings > Rendering > prefers-reduced-motion
 * - Or set in OS accessibility settings
 */

import { AnimatedPage } from '../components/AnimatedPage';
import ExampleAbout from '../components/examples/ExampleAbout';
import ExampleSkills from '../components/examples/ExampleSkills';
import FadeUp from '../components/FadeUp';

export const FadeUpExample = () => {
  return (
    <AnimatedPage>
      {/* Hero Section with FadeUp */}
      <section className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp delay={0}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Scroll Fade-Up Animation
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-white/70 text-xl mb-8">
              Scroll down to see the fade-up animation in action
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="text-white/50 text-sm">
              <p>
                Each section below uses the FadeUp component with different
                delay values for staggered animations.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Example About Section */}
      <ExampleAbout />

      {/* Spacer */}
      <div className="h-20 bg-[#0d0d0d]" />

      {/* Example Skills Section */}
      <ExampleSkills />

      {/* Additional Example: Cards with varying delays */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="container mx-auto max-w-6xl">
          <FadeUp delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center">
              Feature Cards
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Responsive Design',
                description:
                  'Works seamlessly across all device sizes and screen resolutions.',
              },
              {
                title: 'Performance Optimized',
                description:
                  'Lightweight animations that don\'t impact page performance.',
              },
              {
                title: 'Accessible',
                description:
                  'Respects user preferences for reduced motion and accessibility.',
              },
            ].map((card, index) => (
              <FadeUp
                key={card.title}
                delay={index * 0.15}
                y={50}
                duration={0.5}
              >
                <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/70">{card.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-40 bg-[#0d0d0d]" />
    </AnimatedPage>
  );
};

