import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-auto"
      style={{ 
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        {/* Toggle Switch */}
        <motion.button
          onClick={toggleTheme}
          className="relative w-24 h-12 rounded-full overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] transition-all shadow-lg"
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
            {/* Clouds */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-2 right-4 w-8 h-6 bg-white/80 rounded-full blur-sm"
                animate={{ x: [0, 2, 0], opacity: [0.8, 0.9, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-3 right-8 w-6 h-5 bg-white/70 rounded-full blur-sm"
                animate={{ x: [0, -1, 0], opacity: [0.7, 0.8, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1 right-12 w-7 h-5 bg-white/75 rounded-full blur-sm"
                animate={{ x: [0, 1.5, 0], opacity: [0.75, 0.85, 0.75] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Night Sky Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"
            animate={{ opacity: isDark ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stars */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${20 + Math.floor(i / 4) * 30}%`,
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
            className="absolute top-1 w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
            animate={{
              x: isDark ? 50 : 0,
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
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
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
                boxShadow: '0 4px 12px rgba(156, 163, 175, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-gray-500/40" />
              <div className="absolute bottom-3 right-2 w-1.5 h-1.5 rounded-full bg-gray-500/30" />
              <div className="absolute top-1/2 right-3 w-1 h-1 rounded-full bg-gray-500/50" />
            </motion.div>
          </motion.div>
        </motion.button>

        {/* Label */}
        <motion.p
          className="text-sm font-medium transition-colors duration-300"
          style={{ 
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {isDark ? 'Night Mode' : 'Day Mode'}
        </motion.p>
      </motion.div>
    </div>
  );
};
