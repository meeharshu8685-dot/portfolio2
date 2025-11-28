import { AnimatedPage } from '../components/AnimatedPage';
import { ProjectCarouselFlow } from '../components/projects/ProjectCarouselFlow';
import { projects } from '../data/projects';

export const Projects = () => {
  return (
    <AnimatedPage>
      <section id="projects" className="min-h-screen bg-[#0d0d0d] pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectCarouselFlow projects={projects} />
        </div>
      </section>
    </AnimatedPage>
  );
};

