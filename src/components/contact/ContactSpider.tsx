import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ContactSpider = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const spiderRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  // Blinking animation (every 3-5 seconds)
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = Math.random() * (5000 - 3000) + 3000; // 3-5s
      const blinkDuration = 150; // 150ms

      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, blinkDuration);
      }, delay);
    };

    scheduleBlink();
  }, []);

  // Gentle up/down bob animation
  useEffect(() => {
    const interval = setInterval(() => {
      y.set(Math.sin(Date.now() / 2000) * 8); // Gentle bob
    }, 16);

    return () => clearInterval(interval);
  }, [y]);

  // Slight tilt toward cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!spiderRef.current) return;

    const rect = spiderRef.current.getBoundingClientRect();
    const spiderCenterX = rect.left + rect.width / 2;
    const mouseXRelative = e.clientX - spiderCenterX;
    const maxAngle = 8; // degrees
    const angle = Math.max(
      -maxAngle,
      Math.min(maxAngle, (mouseXRelative / (rect.width / 2)) * maxAngle)
    );

    setMouseX(angle);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={spiderRef}
      className="absolute top-4 right-4 z-10"
      style={{
        y: springY,
        rotateZ: mouseX,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Thread */}
      <svg
        className="absolute -top-8 left-1/2 transform -translate-x-1/2"
        width="2"
        height="32"
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="32"
          stroke="#a855f7"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Spider */}
      <svg width="40" height="40" viewBox="0 0 100 100">
        {/* Legs - Left */}
        <path
          d="M 25 35 L 15 28"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 27 40 L 12 35"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 28 45 L 15 45"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 27 50 L 12 55"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Legs - Right */}
        <path
          d="M 75 35 L 85 28"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 73 40 L 88 35"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 72 45 L 85 45"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 73 50 L 88 55"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Body */}
        <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
        <circle cx="50" cy="50" r="5" fill="#2a2a2a" />

        {/* Head */}
        <circle cx="50" cy="42" r="6" fill="#1a1a1a" />

        {/* Eyes */}
        {isBlinking ? (
          <>
            <rect x="47" y="40" width="3" height="1" rx="0.5" fill="#ffffff" />
            <rect x="50" y="40" width="3" height="1" rx="0.5" fill="#ffffff" />
          </>
        ) : (
          <>
            <circle cx="48" cy="40" r="2" fill="#ffffff" />
            <circle cx="52" cy="40" r="2" fill="#ffffff" />
            <circle cx="48" cy="40" r="1" fill="#1a1a1a" />
            <circle cx="52" cy="40" r="1" fill="#1a1a1a" />
          </>
        )}
      </svg>
    </motion.div>
  );
};

