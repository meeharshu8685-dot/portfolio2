import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggleCompact = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] transition-all shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Day Sky Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-400"
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Small Clouds */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1 right-2 w-4 h-3 bg-white/80 rounded-full blur-sm"
            animate={{ x: [0, 1, 0], opacity: [0.8, 0.9, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1.5 right-4 w-3 h-2.5 bg-white/70 rounded-full blur-sm"
            animate={{ x: [0, -0.5, 0], opacity: [0.7, 0.8, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Night Sky Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Small Stars */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${20 + (i % 2) * 30}%`,
                top: `${30 + Math.floor(i / 2) * 40}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Slider - Sun when light, Moon when dark */}
      <motion.div
        className="absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Sun (Light Mode) */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500"
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-sm" />
        </motion.div>

        {/* Moon (Dark Mode) */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400"
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: '0 2px 8px rgba(156, 163, 175, 0.3), 0 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Moon craters */}
          <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-gray-500/40" />
          <div className="absolute bottom-1.5 right-1 w-0.75 h-0.75 rounded-full bg-gray-500/30" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

