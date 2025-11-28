import { AnimatedPage } from '../components/AnimatedPage';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
  return (
    <AnimatedPage>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </AnimatedPage>
  );
};

