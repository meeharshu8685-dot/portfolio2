import React, { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Project } from '../../data/projects';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiImage } from 'react-icons/fi';

interface SpotlightBentoGridProps {
    projects: Project[];
}

const SpotlightCard = ({ project, className = '' }: { project: Project; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const [imgError, setImgError] = React.useState(false);

    return (
        <motion.div
            className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-800/50 border-b border-white/5">
                    {!imgError ? (
                        <img
                            src={project.image}
                            alt={project.name}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-white/20">
                            <FiImage className="mb-2 text-3xl" />
                            <span className="text-sm font-medium">Image Unavailable</span>
                        </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-60" />
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                {project.name}
                            </h3>
                            {project.credits && (
                                <span className="text-xs font-medium text-purple-400/80 mt-1 block">
                                    {project.credits}
                                </span>
                            )}
                        </div>
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-400 group-hover:scale-110"
                            aria-label={`View ${project.name}`}
                        >
                            <BsArrowUpRight className="text-lg" />
                        </a>
                    </div>

                    <p className="mb-6 line-clamp-3 text-sm text-zinc-400">
                        {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-white/10 group-hover:bg-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-500">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SpotlightBentoGrid = ({ projects }: SpotlightBentoGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {projects.map((project, index) => {
                // Bento Grid Logic: 1st and 4th items span 2 columns on desktop
                // Adjust indices based on your preference. 
                // 0-indexed: 0 is 1st, 3 is 4th.
                const isSpan2 = index === 0 || index === 3;

                return (
                    <SpotlightCard
                        key={project.id}
                        project={project}
                        className={isSpan2 ? 'lg:col-span-2' : ''}
                    />
                );
            })}
        </div>
    );
};

export default SpotlightBentoGrid;
