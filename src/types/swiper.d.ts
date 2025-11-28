declare module 'swiper/react' {
  import { ReactNode } from 'react';

  export interface SwiperProps {
    [key: string]: any;
  }

  export interface SwiperSlideProps {
    [key: string]: any;
  }

  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<SwiperSlideProps>;
}

declare module 'swiper/modules' {
  export const EffectCoverflow: any;
  export const Navigation: any;
  export const Pagination: any;
}

