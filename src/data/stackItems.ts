export type StackCategory = 'Hardware' | 'Software' | 'Dev Stack';

export interface StackItem {
    id: string;
    name: string;
    category: StackCategory;
    description: string;
    icon: string; // Emoji or icon identifier
    details: string[]; // Array of detail lines for the flip card back
    color?: string; // Optional accent color
}

export const stackItems: StackItem[] = [
    // Hardware
    {
        id: 'macbook-air-m1',
        name: 'MacBook Air M1',
        category: 'Hardware',
        description: 'Primary development machine',
        icon: '💻',
        details: [
            '8-Core CPU, 7-Core GPU',
            '8GB Unified Memory',
            '256GB SSD Storage',
            'Perfect for React & Next.js development',
            'All-day battery life'
        ],
        color: '#A2AAAD'
    },
    {
        id: 'keychron-k2',
        name: 'Keychron K2',
        category: 'Hardware',
        description: 'Wireless mechanical keyboard',
        icon: '⌨️',
        details: [
            'Hot-swappable switches',
            'Wireless Bluetooth 5.1',
            'Mac & Windows compatible',
            'RGB backlight',
            'Compact 75% layout'
        ],
        color: '#E85D45'
    },
    {
        id: 'sony-wh1000xm4',
        name: 'Sony WH-1000XM4',
        category: 'Hardware',
        description: 'Premium noise-cancelling headphones',
        icon: '🎧',
        details: [
            'Industry-leading noise cancellation',
            '30-hour battery life',
            'Multipoint connection',
            'Speak-to-chat technology',
            'Perfect for deep work sessions'
        ],
        color: '#000000'
    },
    {
        id: 'lenovo-thinkpad',
        name: 'Lenovo Thinkpad',
        category: 'Hardware',
        description: 'Reliable backup workstation',
        icon: '🖥️',
        details: [
            'ThinkPad X Series',
            'Intel Core processor',
            'Legendary keyboard',
            'Built for productivity',
            'Linux-friendly hardware'
        ],
        color: '#E2231A'
    },

    // Software
    {
        id: 'vscode',
        name: 'VS Code',
        category: 'Software',
        description: 'Primary code editor',
        icon: '📝',
        details: [
            'Extensions: Prettier, ESLint, Tailwind IntelliSense',
            'Theme: One Dark Pro / GitHub Dark',
            'Font: JetBrains Mono with ligatures',
            'Integrated terminal & Git',
            'Custom keybindings for efficiency'
        ],
        color: '#007ACC'
    },
    {
        id: 'cursor',
        name: 'Cursor',
        category: 'Software',
        description: 'AI-powered code editor',
        icon: '🤖',
        details: [
            'GPT-4 powered code suggestions',
            'Context-aware completions',
            'Natural language commands',
            'Built on VS Code foundation',
            'Accelerates development workflow'
        ],
        color: '#8B5CF6'
    },
    {
        id: 'warp',
        name: 'Warp',
        category: 'Software',
        description: 'Modern terminal reimagined',
        icon: '⚡',
        details: [
            'Block-based command editing',
            'AI command search',
            'Shared workflows & notebooks',
            'GPU-accelerated rendering',
            'Native macOS experience'
        ],
        color: '#00D4FF'
    },
    {
        id: 'figma',
        name: 'Figma',
        category: 'Software',
        description: 'Design & prototyping tool',
        icon: '🎨',
        details: [
            'UI/UX design & wireframing',
            'Real-time collaboration',
            'Component libraries',
            'Developer handoff',
            'Plugin ecosystem'
        ],
        color: '#F24E1E'
    },
    {
        id: 'framer',
        name: 'Framer',
        category: 'Software',
        description: 'Interactive design & prototyping',
        icon: '✨',
        details: [
            'Code-based design system',
            'Advanced animations',
            'React component export',
            'No-code site builder',
            'Responsive breakpoints'
        ],
        color: '#0055FF'
    },
    {
        id: 'notion',
        name: 'Notion',
        category: 'Software',
        description: 'All-in-one workspace',
        icon: '📚',
        details: [
            'Project management & planning',
            'Knowledge base & documentation',
            'Task tracking & databases',
            'Team collaboration',
            'Custom templates & workflows'
        ],
        color: '#000000'
    },
    {
        id: 'spotify',
        name: 'Spotify',
        category: 'Software',
        description: 'Coding soundtrack',
        icon: '🎵',
        details: [
            'Curated focus playlists',
            'Lo-fi beats for coding',
            'Discover Weekly deep dives',
            'Offline listening mode',
            'Cross-device sync'
        ],
        color: '#1DB954'
    },

    // Dev Stack
    {
        id: 'nextjs',
        name: 'Next.js 14',
        category: 'Dev Stack',
        description: 'React framework for production',
        icon: '▲',
        details: [
            'App Router with RSC',
            'Server & Client Components',
            'Built-in optimization',
            'API routes & middleware',
            'Edge runtime support'
        ],
        color: '#000000'
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Dev Stack',
        description: 'Utility-first CSS framework',
        icon: '🎨',
        details: [
            'Rapid UI development',
            'Custom design system',
            'JIT compiler',
            'Dark mode support',
            'Component styling freedom'
        ],
        color: '#06B6D4'
    },
    {
        id: 'framer-motion',
        name: 'Framer Motion',
        category: 'Dev Stack',
        description: 'Animation library for React',
        icon: '🌊',
        details: [
            'Declarative animations',
            'Gesture recognition',
            'Layout animations',
            'SVG path morphing',
            'Spring physics engine'
        ],
        color: '#FF0055'
    },
    {
        id: 'supabase',
        name: 'Supabase',
        category: 'Dev Stack',
        description: 'Open-source Firebase alternative',
        icon: '🔥',
        details: [
            'PostgreSQL database',
            'Authentication & authorization',
            'Real-time subscriptions',
            'Storage & CDN',
            'Auto-generated APIs'
        ],
        color: '#3ECF8E'
    },
    {
        id: 'firebase',
        name: 'Firebase',
        category: 'Dev Stack',
        description: 'Backend-as-a-Service platform',
        icon: '🚀',
        details: [
            'Firestore NoSQL database',
            'Firebase Authentication',
            'Cloud Functions',
            'Hosting & CDN',
            'Analytics & monitoring'
        ],
        color: '#FFCA28'
    }
];

// Helper function to get items by category
export const getItemsByCategory = (category: StackCategory): StackItem[] => {
    return stackItems.filter(item => item.category === category);
};

// Get all categories
export const categories: StackCategory[] = ['Hardware', 'Software', 'Dev Stack'];
