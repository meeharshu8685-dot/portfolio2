import FadeUp from '../FadeUp';

/**
 * Example About Section
 * 
 * Demonstrates FadeUp usage with multiple elements
 * using staggered delays for sequential animation.
 */
export default function ExampleAbout() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="container mx-auto max-w-4xl">
        <FadeUp delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-white/80 text-lg leading-relaxed mb-4">
            I am a first-year Computer Science student at BITS Pilani, exploring
            technology across multiple domains. My interests include AI/ML
            engineering, data analytics, and modern web development.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="text-white/70 text-base leading-relaxed">
            I enjoy building digital products, leveraging no-code tools, and
            designing clean, user-focused interfaces. I am focused on expanding
            my technical knowledge and contributing to projects that combine
            creativity, logic, and intelligent systems.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

