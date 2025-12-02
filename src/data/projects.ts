export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  live: string;
  image: string;
  credits?: string;
  order: number; // For ordering projects chronologically
}

export const projects: Project[] = [
  {
    id: "my-first-portfolio",
    name: "My First Portfolio",
    description: "A visually modern and interactive personal portfolio website showcasing my work, skills, and journey in tech. Features smooth animations, responsive design, and a clean aesthetic.",
    tech: ["React.js","Tailwind CSS","TypeScript","Framer Motion","Vercel"],
    live: "https://iykhrshuu.vercel.app/",
    image: "https://image2url.com/images/1764685149929-170aa2bd-ffe4-4a7f-a70e-49ad2fea4efe.png",
    credits: "Solo Project",
    order: 1
  },
  {
    id: "notesnest",
    name: "NotesNest – Personal Notes & Resource Hub",
    description: "Organize and showcase college study materials with Google Drive integration for centralized content access.",
    tech: ["React.js","Tailwind CSS","Firebase","Google Drive API","Vercel"],
    live: "https://notes-nest-weld.vercel.app/",
    image: "https://image2url.com/images/1764684752802-3d042f62-84c1-4c21-881e-cd040f22d7b2.png",
    credits: "Solo Project",
    order: 2
  },
  {
    id: "innerdecode",
    name: "InnerDecode",
    description: "A minimal, choice-based decision support system built to map user challenges and instantly deliver actionable solutions.",
    tech: ["React.js","Tailwind CSS","Zustand","Vercel"],
    live: "https://innerdecode.vercel.app/",
    image: "https://image2url.com/images/1764684385535-69a3487a-f134-4d1a-a6d5-f9e6ecd05fe8.png",
    credits: "Solo Project",
    order: 3
  },
  {
    id: "blusdesk",
    name: "Blusdesk – All-in-One Business Platform",
    description: "A complete business support platform featuring ticketing systems, knowledge base management, and customer support operations. Designed to boost productivity and enhance workflow efficiency for teams.",
    tech: ["Next.js","Tailwind CSS","TypeScript","Zustand","Node.js","Vercel"],
    live: "https://blusdesk.vercel.app/",
    image: "https://image2url.com/images/1764685453042-f20000d4-ea19-4505-8875-b347712f57f2.png",
    credits: "Solo Project",
    order: 4
  },
  {
    id: "mediguardia",
    name: "MediGuardia – AI Medical Assistant (Ongoing)",
    description: "A full-stack application designed to be a personal health companion, offering immediate medical insights and critical emergency support. Key features include an AI Symptom Checker powered by the Gemini API for real-time analysis and recommendations, a real-time Hospital Locator with directions, a one-tap SOS Emergency Module for immediate location sharing, and comprehensive Medical Profile and Medication Management. The app is built with a hybrid backend architecture, utilizing Supabase for robust authentication.",
    tech: ["Next.js","Tailwind CSS","Gemini AI API","Node.js","Zustand","Vercel"],
    live: "https://mediguardia.vercel.app",
    image: "https://image2url.com/images/1764681634283-3d252a7b-4783-4a3d-9e25-0ed973f1df85.png",
    credits: "Partner • Co-created with Abhishek Gaud • Ongoing",
    order: 5
  }
].sort((a, b) => a.order - b.order); // Sort by order

