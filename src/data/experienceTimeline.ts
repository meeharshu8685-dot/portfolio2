export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tech: string[];
}

export const experienceTimeline: TimelineItem[] = [
  {
    year: "2024",
    title: "Started BITS Pilani CS",
    description: "Began my Computer Science journey and started learning fundamentals.",
    tech: ["C", "Mathematics", "Problem Solving"]
  },
  {
    year: "2024",
    title: "Frontend Development",
    description: "Learned HTML, CSS, JS, React, Tailwind and built small UI projects.",
    tech: ["HTML", "CSS", "React", "Tailwind"]
  },
  {
    year: "2024",
    title: "AI/ML Foundations",
    description: "Exploring machine learning fundamentals and AI workflows.",
    tech: ["Python", "AI Prompting", "Tensorflow Basics"]
  },
  {
    year: "2025",
    title: "Built Major Projects",
    description: "Created NotesNest, InnerDecode, MediGuardia, and Blusdesk.",
    tech: ["React", "Next.js", "Firebase", "Gemini API"]
  }
];

