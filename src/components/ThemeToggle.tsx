import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import type { Theme } from '../contexts/ThemeContext';

const themes = [
  { id: 'dark', name: 'Dark', icon: '🌙', gradient: 'from-gray-800 to-gray-900' },
  { id: 'light', name: 'Light', icon: '☀️', gradient: 'from-yellow-200 to-orange-200' },
  { id: 'purple', name: 'Purple', icon: '💜', gradient: 'from-purple-600 to-indigo-600' },
  { id: 'blue', name: 'Blue', icon: '💙', gradient: 'from-blue-600 to-cyan-600' },
  { id: 'green', name: 'Green', icon: '💚', gradient: 'from-green-600 to-emerald-600' },
] as const;

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="relative"
      >
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            {themes.find((t) => t.id === theme)?.icon || '🎨'}
          </motion.div>
        </motion.button>

        {/* Theme Options */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              />

              {/* Options Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[200px]"
              >
                <p className="text-white/80 text-xs font-semibold mb-3 text-center">
                  Choose Theme
                </p>
                <div className="space-y-2">
                  {themes.map((themeOption) => (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => {
                        setTheme(themeOption.id as Theme);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                        theme === themeOption.id
                          ? 'bg-gradient-to-r ' + themeOption.gradient + ' text-white'
                          : 'bg-white/5 hover:bg-white/10 text-white/70'
                      }`}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xl">{themeOption.icon}</span>
                      <span className="text-sm font-medium">{themeOption.name}</span>
                      {theme === themeOption.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};


