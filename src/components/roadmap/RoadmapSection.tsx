import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmap } from '../../data/roadmap';

export const RoadmapSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative min-h-screen bg-[#0d0d0d] py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Roadmap & Goals
          </h2>
          <p className="text-white/60 text-lg md:text-xl">
            My long-term growth plan (2025 → 2028)
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop: Horizontal Zig-Zag Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* SVG Timeline Path - Zig-Zag */}
              <svg
                className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2"
                style={{ zIndex: 0 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 0,50 L 12.5,30 L 25,50 L 37.5,30 L 50,50 L 62.5,30 L 75,50 L 87.5,30 L 100,50"
                  stroke="url(#timelineGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>

              {/* Nodes Grid */}
              <div className="relative grid grid-cols-5 gap-4" style={{ zIndex: 1 }}>
                {roadmap.map((item, index) => {
                  const isOpen = openId === item.id;
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={item.id}
                      className="relative flex flex-col items-center"
                      style={{
                        top: isEven ? '-60px' : '60px',
                      }}
                    >
                      {/* Node Circle */}
                      <motion.button
                        onClick={() => toggleNode(item.id)}
                        className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center border-4 border-[#0d0d0d] shadow-lg cursor-pointer group"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: isOpen
                            ? [
                                '0 0 20px rgba(168, 85, 247, 0.6)',
                                '0 0 40px rgba(168, 85, 247, 0.8)',
                                '0 0 20px rgba(168, 85, 247, 0.6)',
                              ]
                            : '0 0 10px rgba(168, 85, 247, 0.4)',
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: isOpen ? Infinity : 0,
                            ease: 'easeInOut',
                          },
                        }}
                      >
                        <span className="text-white font-bold text-sm">
                          {item.period.split(' ')[0]}
                        </span>
                        {/* Pulsing Ring */}
                        {isOpen && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                      </motion.button>

                      {/* Card */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className={`absolute z-20 w-80 ${
                              isEven ? 'top-20' : 'bottom-20'
                            }`}
                            initial={{ opacity: 0, height: 0, y: isEven ? -20 : 20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: isEven ? -20 : 20 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            style={{
                              left:
                                index === 0
                                  ? '0'
                                  : index === roadmap.length - 1
                                    ? 'auto'
                                    : '50%',
                              right: index === roadmap.length - 1 ? '0' : 'auto',
                              transform:
                                index === 0 || index === roadmap.length - 1
                                  ? 'none'
                                  : 'translateX(-50%)',
                            }}
                          >
                            <motion.div
                              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl"
                              whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                              }}
                            >
                              <h3 className="text-xl font-bold text-white mb-2">
                                {item.title}
                              </h3>
                              <p className="text-purple-400 font-semibold mb-4">
                                {item.primaryFocus}
                              </p>
                              <ul className="space-y-2 mb-4">
                                {item.bullets.map((bullet, idx) => (
                                  <li
                                    key={idx}
                                    className="text-white/70 text-sm flex items-start gap-2"
                                  >
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-blue-400 text-sm font-medium">
                                  <span className="text-white/60">Goal: </span>
                                  {item.outcomeGoal}
                                </p>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500" />

              {/* Nodes */}
              <div className="space-y-12">
                {roadmap.map((item) => {
                  const isOpen = openId === item.id;

                  return (
                    <div key={item.id} className="relative pl-20">
                      {/* Node Circle */}
                      <motion.button
                        onClick={() => toggleNode(item.id)}
                        className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center border-4 border-[#0d0d0d] shadow-lg cursor-pointer z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: isOpen
                            ? [
                                '0 0 20px rgba(168, 85, 247, 0.6)',
                                '0 0 40px rgba(168, 85, 247, 0.8)',
                                '0 0 20px rgba(168, 85, 247, 0.6)',
                              ]
                            : '0 0 10px rgba(168, 85, 247, 0.4)',
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: isOpen ? Infinity : 0,
                            ease: 'easeInOut',
                          },
                        }}
                      >
                        <span className="text-white font-bold text-xs">
                          {item.period.split(' ')[0]}
                        </span>
                        {/* Pulsing Ring */}
                        {isOpen && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                      </motion.button>

                      {/* Card */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl mt-4"
                              whileHover={{
                                scale: 1.01,
                                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                              }}
                            >
                              <h3 className="text-xl font-bold text-white mb-2">
                                {item.title}
                              </h3>
                              <p className="text-purple-400 font-semibold mb-4">
                                {item.primaryFocus}
                              </p>
                              <ul className="space-y-2 mb-4">
                                {item.bullets.map((bullet, idx) => (
                                  <li
                                    key={idx}
                                    className="text-white/70 text-sm flex items-start gap-2"
                                  >
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-blue-400 text-sm font-medium">
                                  <span className="text-white/60">Goal: </span>
                                  {item.outcomeGoal}
                                </p>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

