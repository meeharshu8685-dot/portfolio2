'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiUser, FiBriefcase, FiMail, FiSun, FiMoon, FiLayers } from 'react-icons/fi';

// 1. FIX: Wrap Link in motion() to allow animations to work
const MotionLink = motion(Link);

const DOCK_ITEMS = [
    { label: 'Home', icon: FiHome, path: '/' },
    { label: 'About', icon: FiUser, path: '/about' },
    { label: 'Projects', icon: FiBriefcase, path: '/projects' },
    { label: 'Arsenal', icon: FiLayers, path: '/arsenal' },
    { label: 'Contact', icon: FiMail, path: '/contact' },
];

function DockIcon({ mouseX, icon: Icon, path, onClick, isActive }: any) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const ref = path ? linkRef : buttonRef;
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // 2. FIX: Increased size range (60px to 110px) for better visibility
    const widthSync = useTransform(distance, [-150, 0, 150], [60, 110, 60]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    // Render as Link if path exists, otherwise as Button (for Theme Toggle)
    if (path) {
        return (
            <MotionLink
                to={path}
                ref={linkRef}
                style={{ width: width as any, height: width as any }}
                className={`aspect-square flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/20 relative ${isActive ? 'bg-white/10 border-white/40' : ''
                    }`}
            >
                <motion.div className="w-1/2 h-1/2 flex items-center justify-center">
                    <Icon className="text-white w-full h-full" />
                </motion.div>
                {isActive && (
                    <motion.div
                        layoutId="active-dock-item"
                        className="absolute -bottom-2 h-1 w-1 rounded-full bg-white"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </MotionLink>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            ref={buttonRef}
            style={{ width: width as any, height: width as any }}
            className="aspect-square flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/20 relative"
        >
            <motion.div className="w-1/2 h-1/2 flex items-center justify-center">
                <Icon className="text-white w-full h-full" />
            </motion.div>
        </motion.button>
    );
}

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-6 py-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
            >
                {DOCK_ITEMS.map((item) => (
                    <DockIcon
                        key={item.path}
                        mouseX={mouseX}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        isActive={location.pathname === item.path}
                    />
                ))}

                {/* Divider */}
                <div className="h-12 w-[1px] bg-white/10 self-center mx-2" />

                {/* Theme Toggle */}
                <DockIcon
                    mouseX={mouseX}
                    icon={isDark ? FiMoon : FiSun}
                    label={isDark ? 'Dark Mode' : 'Light Mode'}
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                />
            </motion.div>
        </div>
    );
}
