import { AnimatedPage } from '../components/AnimatedPage';
import SplitProjectHighlight from '../components/SplitProjectHighlight';
import { projects } from '../data/projects';

export const Projects = () => {
  // Adapt existing projects data to SplitProjectHighlight shape
  const highlightProjects = projects.map((p) => ({
    id: p.id,
    title: p.name,
    role: p.credits || 'Project',
    desc: p.description,
    year: '',
    type: p.tech[0] || 'Project',
    stack: p.tech.join(' • '),
    img: p.image,
    thumbs: [],
    liveUrl: p.live,
    caseUrl: undefined,
  }));

  return (
    <AnimatedPage>
      <section id="projects" className="min-h-screen pt-24 pb-20 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SplitProjectHighlight projects={highlightProjects} initialIndex={0} />
        </div>
      </section>
    </AnimatedPage>
  );
};

