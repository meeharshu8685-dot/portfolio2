import React from 'react';
import SplitProjectHighlight from './SplitProjectHighlight';
import './SplitProjectHighlight.css';

// Sample demo projects
const demoProjects = [
  {
    id: 'medi-1',
    title: 'MediSense — Symptom AI Companion',
    role: 'Featured Product',
    desc: 'AI-driven symptom checker, first-aid guidance, and hospital routing with offline support and privacy-first design.',
    year: '2025',
    type: 'Health App',
    stack: 'React • Firebase',
    img: 'https://images.unsplash.com/photo-1584466977772-2f8f2c7c4edb?q=80&w=1600&auto=format&fit=crop',
    thumbs: [],
    liveUrl: 'https://example.com/medisense-live',
    caseUrl: 'https://example.com/medisense-case',
  },
  {
    id: 'vision-2',
    title: 'VisionBoard — Spatial Productivity OS',
    role: 'Lead Engineer',
    desc: 'A spatial canvas for planning, docs, and tasks with realtime multiplayer and AI summaries for busy product teams.',
    year: '2024',
    type: 'Web App',
    stack: 'Next.js • Supabase',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
    thumbs: [],
    liveUrl: 'https://example.com/visionboard',
    caseUrl: 'https://example.com/visionboard-case',
  },
  {
    id: 'studio-3',
    title: 'StudioWave — Generative Media Platform',
    role: 'Solo Builder',
    desc: 'Create and iterate on brand visuals, motion snippets, and campaign concepts with a collaborative AI-first editor.',
    year: '2023',
    type: 'Creative Tool',
    stack: 'Vite • TypeScript',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
    thumbs: [],
    liveUrl: 'https://example.com/studiowave',
    caseUrl: 'https://example.com/studiowave-case',
  },
];

export default function AppDemo() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', padding: '1.5rem' }}>
      <SplitProjectHighlight
        projects={demoProjects}
        initialIndex={0}
        onOpenCase={(project) => {
          // Example: track analytics or route inside your app
          // eslint-disable-next-line no-console
          console.log('Open case study:', project.id);
        }}
      />
    </div>
  );
}


