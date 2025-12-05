import { useState } from 'react';
import { motion } from 'framer-motion';
import { StackItem } from '../../data/stackItems';

interface FlipCardProps {
    item: StackItem;
}

export const FlipCard = ({ item }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="flip-card-container h-64 cursor-pointer perspective-1000"
            onClick={handleFlip}
        >
            <motion.div
                className="flip-card-inner relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                }}
                style={{
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Front Face */}
                <div
                    className="flip-card-face flip-card-front absolute w-full h-full rounded-xl glass border border-white/10 p-6 flex flex-col items-center justify-center text-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                    </p>

                    {/* Category Badge */}
                    <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                        style={{
                            backgroundColor: item.color ? `${item.color}20` : 'var(--accent-50)',
                            borderColor: item.color ? `${item.color}40` : 'var(--accent)',
                            color: item.color || 'var(--accent)'
                        }}
                    >
                        {item.category}
                    </div>

                    {/* Flip Indicator */}
                    <div className="mt-4 text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        Click to flip →
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="flip-card-face flip-card-back absolute w-full h-full rounded-xl glass border border-white/10 p-6 flex flex-col"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.icon}</span>
                            <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                {item.name}
                            </h4>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {item.details.map((detail, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: isFlipped ? index * 0.1 : 0 }}
                                className="flex items-start gap-2"
                            >
                                <span
                                    className="text-xs mt-1 flex-shrink-0"
                                    style={{ color: item.color || 'var(--accent)' }}
                                >
                                    ▪
                                </span>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Back Indicator */}
                    <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        ← Click to flip back
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
