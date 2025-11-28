import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';

export const AboutCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 md:p-8 lg:p-10"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 text-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="text-white/80 text-lg leading-relaxed mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        First-year Computer Science student at BITS Pilani. Passionate about
        AI/ML, data analytics and building user-focused web products.
      </motion.p>
      <motion.p
        className="text-white/70 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {siteData.shortBio}
      </motion.p>
    </motion.div>
  );
};

