import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { AnimationCard } from '../../data/animationCards';

interface SwipeCardAnimationProps {
  cards?: AnimationCard[];
}

const COLORS = ['#eff58c', '#93f5cf', '#f3c28a', '#7dbafc'];

export const SwipeCardAnimation = ({ 
  cards = [] 
}: SwipeCardAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = cards.length > 0 ? cards : [];
  const currentCard = cardsToShow[currentIndex];
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : cardsToShow.length - 1;
  const nextIndex = currentIndex < cardsToShow.length - 1 ? currentIndex + 1 : 0;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const scale = useTransform(x, [-200, 200], [0.98, 0.98]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    
    if (info.offset.x > threshold) {
      // Swipe right - go to previous
      setCurrentIndex(previousIndex);
    } else if (info.offset.x < -threshold) {
      // Swipe left - go to next
      setCurrentIndex(nextIndex);
    }
    
    x.set(0);
  };

  const goToNext = () => {
    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex(previousIndex);
  };

  if (cardsToShow.length === 0) return null;

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background Color Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          backgroundColor: COLORS[currentIndex % COLORS.length] 
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* 2x2 Background Gradients */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20">
        <div className="bg-gradient-to-br from-purple-500/30 to-transparent" />
        <div className="bg-gradient-to-tl from-blue-500/30 to-transparent" />
        <div className="bg-gradient-to-tr from-pink-500/30 to-transparent" />
        <div className="bg-gradient-to-bl from-indigo-500/30 to-transparent" />
      </div>

      {/* Cards Container */}
      <div className="relative w-[300px] h-[400px] z-10">
        {/* Left Card */}
        {cardsToShow[previousIndex] && (
          <motion.div
            className="absolute inset-0 glass rounded-2xl p-6 cursor-pointer"
            initial={{ x: -120, opacity: 0.5, scale: 0.9 }}
            animate={{
              x: -120,
              opacity: 0.5,
              scale: 0.9,
              filter: 'blur(4px)',
            }}
            whileHover={{ opacity: 0.7 }}
            onClick={goToPrevious}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <CardContent card={cardsToShow[previousIndex]} />
          </motion.div>
        )}

        {/* Center Card */}
        <motion.div
          className="absolute inset-0 glass rounded-2xl p-6 cursor-grab active:cursor-grabbing shadow-2xl"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x, rotate, scale }}
          animate={{
            x: 0,
            rotate: 0,
            scale: 1,
          }}
          whileHover={{ y: -10 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Soft Blob Behind Card */}
          <motion.div
            className="absolute -inset-10 bg-white/15 rounded-full blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <CardContent card={currentCard} />
        </motion.div>

        {/* Right Card */}
        {cardsToShow[nextIndex] && (
          <motion.div
            className="absolute inset-0 glass rounded-2xl p-6 cursor-pointer"
            initial={{ x: 120, opacity: 0.5, scale: 0.9 }}
            animate={{
              x: 120,
              opacity: 0.5,
              scale: 0.9,
              filter: 'blur(4px)',
            }}
            whileHover={{ opacity: 0.7 }}
            onClick={goToNext}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <CardContent card={cardsToShow[nextIndex]} />
          </motion.div>
        )}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {cardsToShow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

interface CardContentProps {
  card: AnimationCard;
}

const CardContent = ({ card }: CardContentProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{card.title}</h3>
      <p className="text-gray-700 text-lg">{card.description}</p>
    </div>
  );
};

