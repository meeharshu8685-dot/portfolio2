import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

type ScaleTiltRevealProps = {
  children: React.ReactNode;
  maxTilt?: number; // default 12 deg
  className?: string;
};

export const ScaleTiltReveal: React.FC<ScaleTiltRevealProps> = ({
  children,
  maxTilt = 12,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const reducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [0, 1], [-maxTilt, maxTilt]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || isTouchDevice || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;

    x.set(posX);
    y.set(posY);
  }

  function resetTilt() {
    if (reducedMotion || isTouchDevice) return;
    x.set(0.5);
    y.set(0.5);
  }

  // If reduced motion or touch device, disable tilt but keep scale reveal
  const shouldTilt = !reducedMotion && !isTouchDevice;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        rotateX: shouldTilt ? rotateX : undefined,
        rotateY: shouldTilt ? rotateY : undefined,
        perspective: shouldTilt ? 1000 : undefined,
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ScaleTiltReveal;

