import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Project } from '../../data/projects';
import { motion } from 'framer-motion';
import { ProjectModal } from '../ProjectModal';

interface ProjectCarouselFlowProps {
  projects: Project[];
}

export const ProjectCarouselFlow = ({
  projects,
}: ProjectCarouselFlowProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="w-full py-12">
      {/* Carousel Container */}
      <div className="relative mb-16">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
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
              <motion.button
                onClick={() => setSelectedProject(project)}
                className="block h-full w-full text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-full bg-white/5 rounded-xl overflow-hidden group cursor-pointer">
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
                    {/* Click Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Project Title */}
                  <div className="p-4 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-white font-semibold text-lg line-clamp-2">
                      {project.name}
                    </h3>
                  </div>

                  {/* Shadow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
                </div>
              </motion.button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gradient">
          My Projects
        </h2>
        <p className="text-white/60 text-base sm:text-lg md:text-xl italic px-4">
          "Projects reflect skills more than certificates."
        </p>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

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

        /* Navigation Arrows */
        .project-carousel .swiper-button-next,
        .project-carousel .swiper-button-prev {
          color: #6366f1;
          width: 44px;
          height: 44px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          border: 1px solid rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        }

        .project-carousel .swiper-button-next:hover,
        .project-carousel .swiper-button-prev:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
          transform: scale(1.1);
        }

        .project-carousel .swiper-button-next::after,
        .project-carousel .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        /* Pagination Dots */
        .project-carousel .swiper-pagination {
          bottom: 0 !important;
        }

        .project-carousel .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .project-carousel .swiper-pagination-bullet-active {
          background: #6366f1;
          width: 32px;
          border-radius: 6px;
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

          .project-carousel .swiper-button-next,
          .project-carousel .swiper-button-prev {
            width: 36px;
            height: 36px;
          }

          .project-carousel .swiper-button-next::after,
          .project-carousel .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

