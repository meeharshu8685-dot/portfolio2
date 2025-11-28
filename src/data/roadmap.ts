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
    title: '2025 (Present – End of Year)',
    period: '2025',
    primaryFocus: 'Begin Data Science (Python)',
    bullets: [
      'Learn Python fundamentals, NumPy, Pandas',
      'Understand statistics, data cleaning, EDA',
      'Start mini data analysis tasks for practice',
      'Build small reproducible notebooks and visualizations',
    ],
    outcomeGoal: 'Build foundation for machine learning and future internships.',
  },
  {
    id: 'mid-2026',
    title: 'Mid–2026',
    period: 'Mid 2026',
    primaryFocus: 'Apply for first internship (Data-related role preferred)',
    bullets: [
      'Keep improving Python & data analytics skills',
      'Learn real-world dataset handling and ETL basics',
      'Learn Git and basic API usage',
      'Strengthen portfolio with 2–3 small projects',
    ],
    outcomeGoal: 'Secure 1st internship before or during mid-2026.',
  },
  {
    id: 'late-2026',
    title: 'Late–2026 → Early–2027',
    period: 'Late 2026 – Early 2027',
    primaryFocus: 'Learn UI/UX & Machine Learning basics',
    bullets: [
      'Study UI/UX fundamentals and design systems',
      'Learn ML basics: regression, classification, clustering',
      'Build ML mini-projects and document experiments',
      'Apply for UI/UX or ML-related internships',
    ],
    outcomeGoal: 'Secure a 2nd internship by early 2027.',
  },
  {
    id: '2027',
    title: '2027 (Mid → End)',
    period: '2027',
    primaryFocus: 'Fullstack & AI-integrated projects',
    bullets: [
      'Learn web development (frontend → backend)',
      'Build real, shipped projects (portfolio grade)',
      'Do internships where available',
      'Combine ML + Web to build AI-powered apps',
    ],
    outcomeGoal: 'Build a strong multi-skill portfolio.',
  },
  {
    id: '2028',
    title: '2028 (Next Step)',
    period: '2028',
    primaryFocus: 'Mastery + Product & Startup prep',
    bullets: [
      'Master UI/UX + Data Science + ML + Web Dev',
      'Prepare for long-term roles & startup roadmap',
      'Start working on scalable idea while working',
      'Polish system design, product thinking, leadership basics',
    ],
    outcomeGoal:
      'Enter industry and begin building long-term startup foundation.',
  },
];

