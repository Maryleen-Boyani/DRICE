import React, { useState, useEffect, useRef } from 'react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref=useRef(null);
  const isInView= useInView(ref,{ once: false, margin:"-100px"});
  const slides = [
    // "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200", // University setting
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1200", // Innovation/Tech
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"  // Collaboration
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative h-[500px] mx-auto md:h-[600px] flex items-center justify-center overflow-hidden text-white">
      
      {slides.map((img, index) => (
        <div
          
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" /> {/* Dark overlay for text readability */}
          <img src={img} alt="Daystar Campus" className="w-full h-full object-cover" />
        </div>
      ))}

 
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="relative z-20 text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-700">
        <span className="bg-daystar-dark text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
          DIRECTORATE OF RESEARCH & INNOVATION
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-6 mb-4">
          Empowering the Next Generation of <span className="text-daystar-blue">African Creators</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200">
          Research <span className='text-daystar-blue font-bold'>→</span> Innovation <span className='text-daystar-blue'>→</span> Commercialisation <span className='text-daystar-blue'>→</span> Impact
          <br /><br />
          A structured pipeline producing publications, datasets, grants, and startups.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;