declare module 'swiper/react' {
  import { SwiperOptions } from 'swiper';
  import { ReactNode } from 'react';

  export interface SwiperProps extends SwiperOptions {
    children?: ReactNode;
    className?: string;
    onSwiper?: (swiper: any) => void;
  }

  export interface SwiperSlideProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<SwiperSlideProps>;
}

declare module 'swiper/modules' {
  export const EffectCoverflow: any;
  export const Navigation: any;
  export const Pagination: any;
}

