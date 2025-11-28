export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "my-first-portfolio",
    name: "My First Portfolio",
    description: "A visually modern and interactive personal portfolio website showcasing my work, skills, and journey in tech. Features smooth animations, responsive design, and a clean aesthetic.",
    tech: ["React.js","Tailwind CSS","TypeScript","Framer Motion","Vercel"],
    live: "https://iykhrshuu.vercel.app/",
    image: "/assets/projects/portfolio.png"
  },
  {
    id: "blusdesk",
    name: "Blusdesk – All-in-One Business Platform",
    description: "A complete business support platform featuring ticketing systems, knowledge base management, and customer support operations.",
    tech: ["Next.js","Tailwind CSS","TypeScript","Zustand","Node.js","Vercel"],
    live: "https://blusdesk.vercel.app/",
    image: "/assets/projects/blusdesk.png"
  },
  {
    id: "notesnest",
    name: "NotesNest – Personal Notes & Resource Hub",
    description: "Organize and showcase college study materials with Google Drive integration for centralized content access.",
    tech: ["React.js","Tailwind CSS","Firebase","Google Drive API","Vercel"],
    live: "https://notes-nest-weld.vercel.app/",
    image: "/assets/projects/notesnest.png"
  },
  {
    id: "innerdecode",
    name: "InnerDecode",
    description: "A minimal, choice-based decision support system built to map user challenges and instantly deliver actionable solutions.",
    tech: ["React.js","Tailwind CSS","Zustand","Vercel"],
    live: "https://innerdecode.vercel.app/",
    image: "/assets/projects/innerdecode.png"
  },
  {
    id: "mediguardia",
    name: "MediGuardia – AI Medical Assistant",
    description: "An AI-driven medical assistant offering intelligent symptom analysis and profile-based health insights. Co-created with Abhishek Gaud.",
    tech: ["Next.js","Tailwind CSS","Gemini AI API","Node.js","Zustand","Vercel"],
    live: "https://mediguardia.vercel.app",
    image: "/assets/projects/mediguardia.png"
  }
];

