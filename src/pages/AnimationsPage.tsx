import { AnimatedPage } from '../components/AnimatedPage';
import { SwipeCardAnimation } from '../components/animations/SwipeCardAnimation';
import { animationCards } from '../data/animationCards';

export const AnimationsPage = () => {
  return (
    <AnimatedPage>
      <SwipeCardAnimation cards={animationCards} />
    </AnimatedPage>
  );
};

