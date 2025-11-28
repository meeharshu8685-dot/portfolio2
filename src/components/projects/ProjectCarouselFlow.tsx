import { Swiper, SwiperSlide } from 'swiper/react';
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
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
                whileHover={{ scale: 1.02 }}
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
              </motion.a>
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

