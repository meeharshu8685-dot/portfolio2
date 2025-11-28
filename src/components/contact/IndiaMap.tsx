import { motion } from 'framer-motion';

export const IndiaMap = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 1000 1200"
        className="w-full h-auto max-w-md"
        style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))' }}
      >
        {/* India Outline - More accurate shape */}
        <motion.path
          d="M 500 50 L 450 80 L 400 120 L 350 180 L 320 250 L 300 320 L 280 400 L 260 480 L 250 560 L 240 640 L 235 720 L 240 800 L 260 880 L 300 950 L 350 1000 L 400 1030 L 450 1050 L 500 1060 L 550 1050 L 600 1030 L 650 1000 L 700 950 L 740 880 L 760 800 L 765 720 L 760 640 L 750 560 L 740 480 L 720 400 L 700 320 L 680 250 L 650 180 L 600 120 L 550 80 L 500 50 Z M 280 400 L 260 450 L 250 500 L 240 550 L 235 600 L 240 650 L 260 700 L 300 750 L 350 780 L 400 790 L 450 780 L 500 750 L 550 700 L 570 650 L 575 600 L 570 550 L 560 500 L 550 450 L 530 400 Z"
          fill="none"
          stroke="#a855f7"
          strokeWidth="4"
          strokeOpacity="0.6"
          animate={{
            strokeOpacity: [0.6, 0.9, 0.6],
            filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gwalior Location Marker (Central India - Madhya Pradesh region) */}
        <g transform="translate(500, 550)">
          {/* Glow Ring */}
          <motion.circle
            cx="0"
            cy="0"
            r="15"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeOpacity="0.5"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Pulsing Dot */}
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            fill="#3b82f6"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Label */}
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#a855f7"
            fontSize="14"
            fontWeight="600"
            className="font-semibold"
          >
            Gwalior
          </text>
        </g>
      </svg>
    </div>
  );
};

