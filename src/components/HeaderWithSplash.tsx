import { motion } from 'framer-motion';
import { SplashCursor } from './ui/splash-cursor';

type HeaderWithSplashProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function HeaderWithSplash({
  title = "Crafting intelligent web experiences.",
  subtitle = "A modern portfolio built with React, TypeScript, and beautiful motion effects.",
  ctaLabel = "View My Work",
  onCtaClick,
}: HeaderWithSplashProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Interactive fluid background */}
      <SplashCursor
        BACK_COLOR={{ r: 0.02, g: 0.0, b: 0.08 }}
        COLOR_UPDATE_SPEED={10}
        SPLAT_RADIUS={0.18}
        SPLAT_FORCE={6500}
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col px-6 pt-6 pb-12">
        {/* Simple top nav */}
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/40" />
            <span className="text-sm font-semibold tracking-wide text-white/90 uppercase">
              Portfolio
            </span>
          </div>
          <div className="hidden gap-6 text-sm font-medium text-white/70 sm:flex">
            <button className="hover:text-white transition-colors">About</button>
            <button className="hover:text-white transition-colors">Projects</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>
        </nav>

        {/* Hero text */}
        <div className="flex flex-1 items-center">
          <div className="mt-12 max-w-2xl">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-5 text-base sm:text-lg md:text-xl text-white/75 max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <button
                onClick={onCtaClick}
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition-transform hover:scale-[1.03]"
              >
                {ctaLabel}
              </button>

              <span className="text-xs sm:text-sm text-white/60">
                Hover and move your cursor to paint the background.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}


