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
      'Start Data Science (Python) - Begin learning Python fundamentals and data science concepts',
      'Learn NumPy, Pandas, EDA - Master data manipulation and exploratory data analysis',
      'Study statistics & data cleaning - Understand statistical concepts and data preprocessing',
      'Prepare for data internship - Build portfolio projects and prepare applications',
    ],
    outcomeGoal: 'Build strong foundation in Data Science and prepare for first internship opportunities.',
  },
  {
    id: 'mid-2026',
    title: 'Mid–2026',
    period: 'Mid 2026',
    primaryFocus: 'Apply for first internship',
    bullets: [
      'Apply for first internship - Target data-related roles and positions',
      'Improve Python + Analytics - Enhance programming and analytical skills',
      'Work with real datasets - Gain hands-on experience with industry data',
      'Learn Git & APIs - Master version control and API integration',
    ],
    outcomeGoal: 'Secure first internship and gain real-world experience with data analytics.',
  },
  {
    id: 'late-2026',
    title: '2026 → Early 2027',
    period: '2026 → Early 2027',
    primaryFocus: 'Learn UI/UX & Machine Learning basics',
    bullets: [
      'Learn UI/UX - Study design principles, user experience, and design systems',
      'Learn Machine Learning basics - Understand regression, classification, and clustering',
      'Build ML mini-projects - Create and document machine learning experiments',
      'Apply for second internship - Target UI/UX or ML-related positions',
    ],
    outcomeGoal: 'Expand skillset with UI/UX and ML, secure second internship.',
  },
  {
    id: '2027',
    title: '2027 End',
    period: '2027 End',
    primaryFocus: 'Learn Web Development & Build Projects',
    bullets: [
      'Learn Web Development - Master frontend and backend technologies',
      'Build projects - Create real, portfolio-grade applications',
      'Do internships - Continue gaining professional experience',
      'Combine ML + Web Dev - Build AI-powered web applications',
    ],
    outcomeGoal: 'Master full-stack development and create AI-powered web applications.',
  },
  {
    id: '2028',
    title: '2028',
    period: '2028',
    primaryFocus: 'Mastery & Startup Preparation',
    bullets: [
      'Master all previous skills - Achieve expertise in UI/UX, Data Science, ML, and Web Dev',
      'Build startup plan - Develop business strategy and product roadmap',
      'Preparing for job + startup simultaneously - Balance career and entrepreneurial goals',
    ],
    outcomeGoal:
      'Enter industry with mastery across all skills and begin building long-term startup foundation.',
  },
];

