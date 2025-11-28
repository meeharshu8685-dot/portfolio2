import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { IconType } from "react-icons";

interface SkillCard3DProps {
  icon: IconType;
  name: string;
  description: string;
  index?: number;
  glowColor?: string;
}

export const SkillCard3D: React.FC<SkillCard3DProps> = ({
  icon: Icon,
  name,
  description,
  index = 0,
  glowColor = "rgba(168, 85, 247, 0.3)",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
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

  // Transform mouse position to rotation values (Apple-style subtle tilt)
  const maxTilt = 8; // Subtle tilt for Apple-style effect
  const rotateX = useTransform(y, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [0, 1], [-maxTilt, maxTilt]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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

  const shouldTilt = !reducedMotion && !isTouchDevice;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative"
      style={{
        perspective: shouldTilt ? 1000 : "none",
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        style={{
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        whileHover={{
          scale: 1.05,
          y: -8,
        }}
        className="h-full"
      >
        {/* Glassmorphism Card */}
        <div
          className="glass rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group cursor-default"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            minHeight: "200px",
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          {/* Icon */}
          <motion.div
            className="mb-4 relative z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon
              className="w-12 h-12 transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            />
          </motion.div>

          {/* Name */}
          <h3
            className="text-lg font-bold mb-2 relative z-10 transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed relative z-10 transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          {/* Subtle border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 0 1px ${glowColor}`,
              opacity: 0,
            }}
            whileHover={{
              opacity: 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard3D;

