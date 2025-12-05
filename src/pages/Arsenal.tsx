import { AnimatedPage } from '../components/AnimatedPage';
import { FlipCard } from '../components/arsenal/FlipCard';
import { categories, getItemsByCategory } from '../data/stackItems';
import { motion } from 'framer-motion';

export const Arsenal = () => {
    return (
        <AnimatedPage>
            <section
                id="arsenal"
                className="min-h-screen pb-32 transition-colors duration-300"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <motion.div
                        className="mb-16 max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
                            The Arsenal
                        </h1>
                        <p className="text-lg md:text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>
                            A curated collection of hardware, software, and development tools that power my workflow.
                        </p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                            Every tool here has been battle-tested and chosen for a reason.
                            Click any card to discover the details behind my tech choices.
                        </p>
                    </motion.div>

                    {/* Categories */}
                    {categories.map((category, categoryIndex) => {
                        const items = getItemsByCategory(category);

                        return (
                            <motion.div
                                key={category}
                                className="mb-16"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            >
                                {/* Category Header */}
                                <div className="mb-8 flex items-center gap-4">
                                    <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {category}
                                    </h2>
                                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.2 }} />
                                    <span
                                        className="text-sm font-medium px-3 py-1 rounded-full glass border"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {items.length} {items.length === 1 ? 'item' : 'items'}
                                    </span>
                                </div>

                                {/* Grid of Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.05,
                                                type: 'spring',
                                                stiffness: 100
                                            }}
                                        >
                                            <FlipCard item={item} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Footer Note */}
                    <motion.div
                        className="mt-20 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            This stack evolves with every project. Last updated: December 2025
                        </p>
                    </motion.div>
                </div>
            </section>
        </AnimatedPage>
    );
};
