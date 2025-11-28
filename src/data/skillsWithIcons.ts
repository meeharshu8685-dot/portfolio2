import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { BiCodeAlt, BiCodeCurly } from "react-icons/bi";
import { MdApi, MdDesignServices } from "react-icons/md";

export interface SkillWithIcon {
  id: string;
  name: string;
  description: string;
  icon: any; // IconType from react-icons
  glowColor: string;
}

export const skillsWithIcons: SkillWithIcon[] = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Core language for web logic and async programming",
    icon: SiJavascript,
    glowColor: "rgba(250, 204, 21, 0.3)", // yellow-400
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Stronger code with static typing",
    icon: SiTypescript,
    glowColor: "rgba(96, 165, 250, 0.3)", // blue-400
  },
  {
    id: "react",
    name: "React.js",
    description: "Building dynamic interfaces and reusable components",
    icon: FaReact,
    glowColor: "rgba(96, 165, 250, 0.3)", // blue-400
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Rapid styling with utility-first CSS",
    icon: SiTailwindcss,
    glowColor: "rgba(56, 189, 248, 0.3)", // cyan-400
  },
  {
    id: "html",
    name: "HTML",
    description: "Semantic markup and structure",
    icon: FaHtml5,
    glowColor: "rgba(251, 146, 60, 0.3)", // orange-400
  },
  {
    id: "css",
    name: "CSS",
    description: "Styling and layout design",
    icon: FaCss3Alt,
    glowColor: "rgba(59, 130, 246, 0.3)", // blue-500
  },
  {
    id: "git",
    name: "Git & GitHub",
    description: "Version control and collaboration",
    icon: FaGitAlt,
    glowColor: "rgba(248, 113, 113, 0.3)", // red-400
  },
  {
    id: "python",
    name: "Python",
    description: "Data science and automation",
    icon: FaPython,
    glowColor: "rgba(251, 191, 36, 0.3)", // yellow-400
  },
  {
    id: "node",
    name: "Node.js",
    description: "Server-side JavaScript runtime",
    icon: SiNodedotjs,
    glowColor: "rgba(34, 197, 94, 0.3)", // green-500
  },
  {
    id: "nocode",
    name: "No-Code Tools",
    description: "Rapid prototyping and automation",
    icon: BiCodeAlt,
    glowColor: "rgba(168, 85, 247, 0.3)", // purple-500
  },
  {
    id: "ai",
    name: "AI Prompt Engineering",
    description: "Crafting effective AI interactions",
    icon: BiCodeCurly,
    glowColor: "rgba(236, 72, 153, 0.3)", // pink-500
  },
  {
    id: "api",
    name: "REST APIs",
    description: "Building and consuming APIs",
    icon: MdApi,
    glowColor: "rgba(34, 197, 94, 0.3)", // green-500
  },
  {
    id: "uiux",
    name: "UI/UX Fundamentals",
    description: "User-centered design principles",
    icon: MdDesignServices,
    glowColor: "rgba(168, 85, 247, 0.3)", // purple-500
  },
];

