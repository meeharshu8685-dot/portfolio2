import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface LiquidCursorProps {
    isActive?: boolean;
}

export const LiquidCursor = ({ isActive = true }: LiquidCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (!isActive) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsHidden(false);

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('magnetic');

            setIsPointer(!!isInteractive);
        };

        const handleMouseLeave = () => {
            setIsHidden(true);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isActive, cursorX, cursorY]);

    if (!isActive || isHidden) return null;

    return (
        <>
            {/* Main liquid cursor */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 1.5 : 1,
                        opacity: isPointer ? 0.6 : 0.8,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                    }}
                    className="relative"
                >
                    {/* Outer glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full blur-xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
                            width: '60px',
                            height: '60px',
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Inner blob */}
                    <motion.div
                        className="rounded-full bg-white"
                        style={{
                            width: '24px',
                            height: '24px',
                            boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                        }}
                        animate={{
                            borderRadius: isPointer
                                ? ['50%', '40%', '50%', '60%', '50%']
                                : ['50%', '48%', '50%', '52%', '50%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Trail effect */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-40"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                        width: '40px',
                        height: '40px',
                        filter: 'blur(8px)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>
        </>
    );
};
