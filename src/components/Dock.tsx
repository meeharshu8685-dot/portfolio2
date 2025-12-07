'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail, FiLayers } from 'react-icons/fi';

// 1. FIX: Wrap Link in motion() to allow animations to work
const MotionLink = motion(Link);

const DOCK_ITEMS = [
    { label: 'Home', icon: FiHome, path: '/' },
    { label: 'About', icon: FiUser, path: '/about' },
    { label: 'Projects', icon: FiBriefcase, path: '/projects' },
    { label: 'Arsenal', icon: FiLayers, path: '/arsenal' },
    { label: 'Contact', icon: FiMail, path: '/contact' },
];

function DockIcon({ mouseX, icon: Icon, path, isActive }: any) {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = linkRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Reduced size range (48px to 88px) for better proportions
    const widthSync = useTransform(distance, [-150, 0, 150], [48, 88, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

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

export default function Dock() {
    const mouseX = useMotionValue(Infinity);
    const location = useLocation();

    return (
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 hidden sm:block">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
            >
                {DOCK_ITEMS.map((item) => (
                    <DockIcon
                        key={item.path}
                        mouseX={mouseX}
                        icon={item.icon}
                        path={item.path}
                        isActive={location.pathname === item.path}
                    />
                ))}
            </motion.div>
        </div>
    );
}
