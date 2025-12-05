'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FiHome, FiUser, FiBriefcase, FiMail, FiSun, FiMoon, FiLayers } from 'react-icons/fi';

const DOCK_ITEMS = [
    { label: 'Home', icon: FiHome, path: '/' },
    { label: 'About', icon: FiUser, path: '/about' },
    { label: 'Projects', icon: FiBriefcase, path: '/projects' },
    { label: 'Arsenal', icon: FiLayers, path: '/arsenal' },
    { label: 'Contact', icon: FiMail, path: '/contact' },
];

interface DockIconProps {
    mouseX: any;
    icon: any;
    label: string;
    path?: string;
    onClick?: () => void;
    isActive?: boolean;
}

function DockIcon({ mouseX, icon: Icon, label, path, onClick, isActive }: DockIconProps) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const Component: any = path ? Link : motion.button;

    return (
        <Component
            to={path}
            onClick={onClick}
            ref={ref}
            style={{ width }}
            className={`aspect-square flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10 group relative ${isActive ? 'bg-white/20 border-white/30' : ''
                }`}
        >
            <Icon className="text-white text-xl" />

            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-10 px-3 py-1 rounded-md bg-black/80 text-white text-xs whitespace-nowrap pointer-events-none"
            >
                {label}
            </motion.div>

            {/* Active Indicator */}
            {isActive && (
                <motion.div
                    layoutId="active-dock-item"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
            )}
        </Component>
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
                className="flex items-end gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
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
                <div className="h-8 w-[1px] bg-white/10 self-center mx-1" />

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
