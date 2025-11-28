import FadeUp from '../FadeUp';

/**
 * Example Skills Section
 * 
 * Demonstrates FadeUp usage in a grid with incremental delays.
 * Each skill card animates in sequence for a staggered effect.
 */
const skills = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Tailwind CSS',
  'Python',
  'Git & GitHub',
  'REST APIs',
  'UI/UX Fundamentals',
];

export default function ExampleSkills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-6xl">
        <FadeUp delay={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gradient text-center">
            Skills & Technologies
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <FadeUp
              key={skill}
              delay={index * 0.12} // Incremental delay: 0s, 0.12s, 0.24s, etc.
              y={30} // Slightly smaller offset for cards
            >
              <div className="glass rounded-lg p-4 text-center hover:bg-white/10 transition-colors cursor-default">
                <span className="text-white/90 font-medium">{skill}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

