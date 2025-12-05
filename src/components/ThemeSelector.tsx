import { motion } from 'framer-motion';
import { useTheme, Theme } from '../contexts/ThemeContext';

const themes: { name: string; value: Theme; color: string; emoji: string }[] = [
    { name: 'Dark', value: 'dark', color: '#4f46e5', emoji: '🌙' },
    { name: 'Light', value: 'light', color: '#6366f1', emoji: '☀️' },
    { name: 'Purple', value: 'purple', color: '#a855f7', emoji: '💜' },
    { name: 'Blue', value: 'blue', color: '#3b82f6', emoji: '💙' },
    { name: 'Green', value: 'green', color: '#10b981', emoji: '💚' },
];

export const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {themes.map((themeOption) => {
                const isActive = theme === themeOption.value;

                return (
                    <motion.button
                        key={themeOption.value}
                        onClick={() => setTheme(themeOption.value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${isActive
                                ? 'border-white/30 bg-white/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        {/* Emoji/Icon */}
                        <div className="text-4xl mb-2 text-center">{themeOption.emoji}</div>

                        {/* Theme Name */}
                        <div className="text-sm font-medium text-center" style={{ color: 'var(--text-primary)' }}>
                            {themeOption.name}
                        </div>

                        {/* Color Indicator */}
                        <div
                            className="mx-auto mt-2 h-1 w-12 rounded-full"
                            style={{ backgroundColor: themeOption.color }}
                        />

                        {/* Active Indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="active-theme"
                                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
};
