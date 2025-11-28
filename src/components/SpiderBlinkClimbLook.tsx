import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';

interface SpiderBlinkClimbLookProps {
  size?: number;
  maxClimb?: number;
  minY?: number;
  maxY?: number;
}

export default function SpiderBlinkClimbLook({
  size = 96,
  maxClimb = 220,
  minY = 40,
  maxY,
}: SpiderBlinkClimbLookProps) {
  // Calculate maxY from maxClimb if not explicitly provided
  const calculatedMaxY = maxY ?? minY + maxClimb;
  
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const y = useMotionValue(minY);
  const springY = useSpring(y, { stiffness: 160, damping: 20 });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Blinking animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scheduleBlink = () => {
      const delay = Math.random() * (4000 - 1500) + 1500; // 1.5s to 4s
      const blinkDuration = Math.random() * (180 - 120) + 120; // 120-180ms

      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, blinkDuration);
      }, delay);
    };

    scheduleBlink();
  }, [prefersReducedMotion]);

  // Scroll-based climbing
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        // Map scroll to vertical position
        // Scrolling down (positive delta) = spider climbs up (decrease Y)
        // Scrolling up (negative delta) = spider descends (increase Y)
        const currentY = y.get();
        const newY = Math.max(
          minY,
          Math.min(calculatedMaxY, currentY - scrollDelta * 0.5)
        );

        y.set(newY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [y, minY, calculatedMaxY, prefersReducedMotion]);

  // Mouse tracking for rotation
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!spiderRef.current || prefersReducedMotion) return;

      const rect = spiderRef.current.getBoundingClientRect();
      const spiderCenterX = rect.left + rect.width / 2;
      const mouseXRelative = e.clientX - spiderCenterX;
      const maxAngle = 12; // degrees
      const angle = Math.max(
        -maxAngle,
        Math.min(maxAngle, (mouseXRelative / (rect.width / 2)) * maxAngle)
      );

      setMouseX(angle);
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Thread reveal animation on mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      controls.start({
        pathLength: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }
  }, [controls, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] flex items-start justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Silk Thread */}
      <svg
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        width="2"
        height="100%"
        style={{ zIndex: 1 }}
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={prefersReducedMotion ? {} : controls}
        />
      </svg>

      {/* Spider */}
      <motion.div
        ref={spiderRef}
        className="absolute"
        style={{
          y: prefersReducedMotion ? minY : springY,
          rotateZ: prefersReducedMotion ? 0 : mouseX,
          x: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          {/* Legs - Left side */}
          <motion.path
            d="M 30 40 L 20 30"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.path
            d="M 32 45 L 18 38"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
          <motion.path
            d="M 34 50 L 20 48"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.path
            d="M 32 55 L 18 58"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />

          {/* Legs - Right side */}
          <motion.path
            d="M 70 40 L 80 30"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.path
            d="M 68 45 L 82 38"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
          <motion.path
            d="M 66 50 L 80 48"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.path
            d="M 68 55 L 82 58"
            stroke="#1a1a1a"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={prefersReducedMotion ? {} : { pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.25 }}
          />

          {/* Body */}
          <circle cx="50" cy="50" r="12" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="8" fill="#2a2a2a" />

          {/* Head */}
          <circle cx="50" cy="38" r="8" fill="#1a1a1a" />

          {/* Eyes */}
          {isBlinking && !prefersReducedMotion ? (
            <>
              {/* Closed eyes (narrow rectangles) */}
              <rect
                x="45"
                y="36"
                width="4"
                height="1"
                rx="0.5"
                fill="#ffffff"
              />
              <rect
                x="51"
                y="36"
                width="4"
                height="1"
                rx="0.5"
                fill="#ffffff"
              />
            </>
          ) : (
            <>
              {/* Open eyes */}
              <circle cx="47" cy="36" r="3" fill="#ffffff" />
              <circle cx="53" cy="36" r="3" fill="#ffffff" />
              <circle cx="47" cy="36" r="1.5" fill="#1a1a1a" />
              <circle cx="53" cy="36" r="1.5" fill="#1a1a1a" />
            </>
          )}
        </svg>
      </motion.div>

      {/* Screen reader text */}
      <span className="sr-only">
        Decorative animated spider that responds to scrolling and mouse movement
      </span>
    </div>
  );
}

