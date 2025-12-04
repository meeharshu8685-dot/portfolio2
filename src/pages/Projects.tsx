import { AnimatedPage } from '../components/AnimatedPage';
import SpotlightBentoGrid from '../components/projects/SpotlightBentoGrid';
import { projects } from '../data/projects';

export const Projects = () => {
  return (
    <AnimatedPage>
      <section id="projects" className="min-h-screen pt-24 pb-20 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-zinc-400 max-w-2xl">
              A collection of projects I've worked on, ranging from web applications to AI integrations.
            </p>
          </div>
          <SpotlightBentoGrid projects={projects} />
        </div>
      </section>
    </AnimatedPage>
  );
};

