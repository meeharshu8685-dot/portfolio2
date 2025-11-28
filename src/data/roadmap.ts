export interface RoadmapItem {
  id: string;
  title: string;
  period: string;
  primaryFocus: string;
  bullets: string[];
  outcomeGoal: string;
}

export const roadmap: RoadmapItem[] = [
  {
    id: '2025',
    title: '2025',
    period: '2025',
    primaryFocus: 'Start Data Science (Python)',
    bullets: [
      'Start Data Science (Python)',
      'Learn NumPy, Pandas, EDA',
      'Study statistics & data cleaning',
      'Prepare for data internship',
    ],
    outcomeGoal: 'Build strong foundation in Data Science and prepare for first internship opportunities.',
  },
  {
    id: 'mid-2026',
    title: 'Mid–2026',
    period: 'Mid 2026',
    primaryFocus: 'Apply for first internship',
    bullets: [
      'Apply for first internship',
      'Improve Python + Analytics',
      'Work with real datasets',
      'Learn Git & APIs',
    ],
    outcomeGoal: 'Secure first internship and gain real-world experience with data analytics.',
  },
  {
    id: 'late-2026',
    title: '2026 → Early 2027',
    period: '2026 → Early 2027',
    primaryFocus: 'Learn UI/UX & Machine Learning basics',
    bullets: [
      'Learn UI/UX',
      'Learn Machine Learning basics',
      'Build ML mini-projects',
      'Apply for second internship',
    ],
    outcomeGoal: 'Expand skillset with UI/UX and ML, secure second internship.',
  },
  {
    id: '2027',
    title: '2027 End',
    period: '2027 End',
    primaryFocus: 'Learn Web Development & Build Projects',
    bullets: [
      'Learn Web Development',
      'Build projects',
      'Do internships',
      'Combine ML + Web Dev',
    ],
    outcomeGoal: 'Master full-stack development and create AI-powered web applications.',
  },
  {
    id: '2028',
    title: '2028',
    period: '2028',
    primaryFocus: 'Mastery & Startup Preparation',
    bullets: [
      'Master all previous skills',
      'Build startup plan',
      'Preparing for job + startup simultaneously',
    ],
    outcomeGoal:
      'Enter industry with mastery across all skills and begin building long-term startup foundation.',
  },
];

