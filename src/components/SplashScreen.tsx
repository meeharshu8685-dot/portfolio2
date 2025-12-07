import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [stage, setStage] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // Stage 0: Initial entrance (0-1s)
            await controls.start({ opacity: 1, scale: 1 });

            // Stage 1: Logo reveal (1-2s)
            setStage(1);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Stage 2: Text reveal (2-3s)
            setStage(2);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Stage 3: Final pulse (3-3.5s)
            setStage(3);
            await new Promise(resolve => setTimeout(resolve, 500));

            // Exit animation (3.5-4s)
            await controls.start({
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.5, ease: 'easeInOut' }
            });

            onComplete();
        };

        sequence();
    }, [controls, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={controls}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #000000 0%, #0a0a1e 50%, #1a0b2e 100%)',
            }}
        >
            {/* Animated background rays */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1 origin-left"
                        style={{
                            height: '150%',
                            background: 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.1), transparent)',
                            transform: `rotate(${i * 30}deg)`,
                        }}
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Logo/Monogram */}
                <motion.div
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{
                        scale: stage >= 1 ? 1 : 0,
                        rotateY: stage >= 1 ? 0 : 180,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                    }}
                    className="mb-8 relative"
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(99, 102, 241, 0.5)',
                                '0 0 60px rgba(99, 102, 241, 0.8)',
                                '0 0 20px rgba(99, 102, 241, 0.5)',
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="inline-block rounded-2xl p-8 relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                            border: '2px solid rgba(99, 102, 241, 0.3)',
                        }}
                    >
                        <motion.svg
                            width="120"
                            height="120"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Animated "HV" monogram */}
                            <motion.path
                                d="M 20 20 L 20 100 M 20 60 L 45 60 M 45 20 L 45 100"
                                stroke="url(#gradient1)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
                            />
                            <motion.path
                                d="M 65 20 L 90 100 L 115 20"
                                stroke="url(#gradient2)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }}
                            />
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </motion.svg>
                    </motion.div>
                </motion.div>

                {/* Welcome text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: stage >= 2 ? 1 : 0,
                        y: stage >= 2 ? 0 : 30,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                    }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-4"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{
                            background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Welcome
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage >= 2 ? 0.7 : 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-300"
                    >
                        Experience Innovation
                    </motion.p>
                </motion.div>

                {/* Animated rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                        style={{
                            borderColor: `rgba(99, 102, 241, ${0.3 - i * 0.1})`,
                        }}
                        animate={{
                            width: [0, 400 + i * 100],
                            height: [0, 400 + i * 100],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
