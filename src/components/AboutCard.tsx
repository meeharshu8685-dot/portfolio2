import { siteData } from '../data/siteData';

export const AboutCard = () => {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Hi, I'm{' '}
        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {siteData.name}
        </span>
      </h2>
      <p
        className="text-lg leading-relaxed mb-4 transition-colors duration-300"
        style={{ color: 'var(--text-secondary)' }}
      >
        First-year Computer Science student at BITS Pilani. Passionate about
        AI/ML, data analytics and building user-focused web products.
      </p>
      <p
        className="leading-relaxed transition-colors duration-300"
        style={{ color: 'var(--text-secondary)' }}
      >
        {siteData.shortBio}
      </p>
    </div>
  );
};

