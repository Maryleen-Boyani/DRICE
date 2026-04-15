import { useRef } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import ResearchEvent from '../components/ResearchEvent';
import Events from '../components/Events';
import Partners from '../components/Partners';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  const eventsRef = useRef(null);

  const scrollToEvents = (e) => {
    e.preventDefault();
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero scrollToEvents={scrollToEvents} />
      <About />
      <HowItWorks />
      <ResearchEvent />
      <div ref={eventsRef}>
        <Events />
      </div>
      <Partners />
      <ContactForm />
    </>
  );
}
