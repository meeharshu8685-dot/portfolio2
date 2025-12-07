import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

export const MagneticWrapper = ({
    children,
    strength = 0.3,
    className = '',
}: MagneticWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Calculate distance from center
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            const maxDistance = 150; // Magnetic field radius

            if (distance < maxDistance) {
                const pullStrength = (1 - distance / maxDistance) * strength;
                x.set(distanceX * pullStrength);
                y.set(distanceY * pullStrength);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        document.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [x, y, strength]);

    return (
        <motion.div
            ref={ref}
            className={`magnetic ${className}`}
            style={{
                x: xSpring,
                y: ySpring,
            }}
        >
            {children}
        </motion.div>
    );
};
