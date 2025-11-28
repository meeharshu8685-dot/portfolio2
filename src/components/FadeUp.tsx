import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

/**
 * FadeUp Component
 * 
 * A reusable scroll-triggered fade-up animation component.
 * Animates elements from below with opacity fade-in when they enter the viewport.
 * 
 * @param children - Content to animate
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param y - Vertical offset in pixels (default: 40)
 * @param once - Whether to animate only once (default: true)
 */
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

// Animation variants for reuse
export const fadeUpVariants = {
  hidden: (y: number = 40) => ({
    opacity: 0,
    y,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  once = true,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  // If reduced motion is preferred, render without animation
  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.28 }} // 0.28 = element must be 28% visible to trigger
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      variants={fadeUpVariants}
      custom={y}
    >
      {children}
    </motion.div>
  );
}

/**
 * Helper hook to check if reduced motion is preferred
 * Can be used in other components for conditional rendering
 */
export function useReducedMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ?? false;
}

