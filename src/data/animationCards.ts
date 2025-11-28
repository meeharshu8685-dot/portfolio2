export interface AnimationCard {
  id: number;
  title: string;
  description: string;
  color: string;
}

export const animationCards: AnimationCard[] = [
  {
    id: 1,
    title: "Learning Frontend",
    description: "HTML, CSS, JS, React foundations",
    color: "#eff58c"
  },
  {
    id: 2,
    title: "Building Projects",
    description: "Portfolio, NotesNest, InnerDecode",
    color: "#93f5cf"
  },
  {
    id: 3,
    title: "Exploring AI/ML",
    description: "AI prompting, data science, Gemini API",
    color: "#f3c28a"
  },
  {
    id: 4,
    title: "Future Goals",
    description: "Master full-stack & ML engineering",
    color: "#7dbafc"
  }
];

