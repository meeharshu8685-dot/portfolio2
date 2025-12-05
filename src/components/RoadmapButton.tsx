'use client';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMap } from 'react-icons/fi';

export default function RoadmapButton() {
    const location = useLocation();
    const isActive = location.pathname === '/roadmap';

    return (
        <Link to="/roadmap">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-colors hover:bg-white/15 ${isActive ? 'bg-white/20 border-white/30' : ''
                    }`}
            >
                <FiMap className="text-white text-xl" />
                <span className="text-white text-sm font-medium">Roadmap</span>

                {/* Active Indicator */}
                {isActive && (
                    <motion.div
                        layoutId="roadmap-active"
                        className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-purple-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </motion.div>
        </Link>
    );
}
