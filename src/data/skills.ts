export interface Skill {
  id: string;
  title: string;
  desc: string;
  icon: string;
  glow: string;
}

export const skills: Skill[] = [
  {
    id: 'python',
    title: 'Python',
    desc: 'Learning Data Science, Pandas, NumPy & analytics workflows.',
    icon: 'python',
    glow: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    desc: 'Core language for web logic, DOM, and async programming.',
    icon: 'javascript',
    glow: 'from-yellow-400 to-lime-400',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    desc: 'Stronger code with static typing and cleaner architecture.',
    icon: 'typescript',
    glow: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'react',
    title: 'React.js',
    desc: 'Building dynamic interfaces and reusable UI components.',
    icon: 'react',
    glow: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    desc: 'Rapid styling with utility-first CSS.',
    icon: 'tailwind',
    glow: 'from-cyan-400 to-sky-500',
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    desc: 'Version control and open-source collaboration.',
    icon: 'git',
    glow: 'from-red-400 to-orange-500',
  },
];

