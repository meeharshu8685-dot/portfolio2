import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Project } from '../../data/projects';
import { motion } from 'framer-motion';

interface ProjectCarouselFlowProps {
  projects: Project[];
}

export const ProjectCarouselFlow = ({
  projects,
}: ProjectCarouselFlowProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isDragging = useRef(false);

  const handleCardClick = (e: React.MouseEvent, project: Project) => {
    // Only open link if it's a direct click (not a drag)
    if (!isDragging.current) {
      window.open(project.live, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };

  return (
    <div className="w-full py-12">
      {/* Carousel Container */}
      <div className="relative mb-16">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onSliderMove={() => {
            isDragging.current = true;
          }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          keyboard={{
            enabled: true,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Navigation, Pagination]}
          className="project-carousel"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="w-[300px] h-[380px]"
            >
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={(e) => handleCardClick(e, project)}
                className="relative h-full bg-white/5 rounded-xl overflow-hidden group cursor-pointer select-none"
              >
                {/* Project Image */}
                <div className="relative h-[300px] overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/300x300/4f46e5/ffffff?text=${encodeURIComponent(project.name)}`;
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Title */}
                <div className="p-4 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-white font-semibold text-lg line-clamp-2">
                    {project.name}
                  </h3>
                </div>

                {/* Shadow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
                
                {/* Click Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-purple-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    Click to View
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex gap-2" />
      </div>

      {/* Bottom Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          My Projects
        </h2>
        <p className="text-white/60 text-lg md:text-xl italic">
          "Projects reflect skills more than certificates."
        </p>
      </motion.div>

      {/* Custom Swiper Styles */}
      <style>{`
        .project-carousel {
          padding: 40px 0 60px 0 !important;
        }

        .project-carousel .swiper-slide {
          transition: all 0.3s ease;
        }

        .project-carousel .swiper-slide-active {
          transform: scale(1.1) !important;
        }

        /* Custom Navigation Arrows - Enhanced visibility */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        /* Custom Pagination Dots */
        .swiper-pagination-custom {
          position: absolute;
          bottom: -40px !important;
        }

        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 0 4px;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #6366f1;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
        }

        /* Coverflow Shadow Effect */
        .project-carousel .swiper-slide-shadow-left,
        .project-carousel .swiper-slide-shadow-right {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.3),
            transparent
          ) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .project-carousel .swiper-slide {
            width: 250px !important;
            height: 320px !important;
          }

          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

