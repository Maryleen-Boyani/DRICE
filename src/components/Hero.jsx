import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const slides = [
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    "./hero2.jpg",
    "./hero1.jpg",
    "./hero3.jpeg"    
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section ref={ref} className="relative h-[75vh] md:h-[85vh] mx-auto flex items-center justify-center overflow-hidden text-white bg-black">
      
      {/* Image Slider Container */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ x: "100%" }} // Starts from the right
            animate={{ x: 0 }}       // Slides to center
            exit={{ x: "-100%" }}    // Slides out to the left
            transition={{ 
              x: { type: "tween", duration: 1.2, ease: "easeInOut" } 
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The overlay is inside the motion div so it moves with the image */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={slides[currentSlide]} 
              alt="Daystar Campus" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={isInView ? { opacity: 1, y: 0 } : {}} 
        transition={{ duration: 2, ease: "easeOut" }} 
        className="relative z-20 text-center px-6 max-w-4xl"
      >
        <span className="bg-daystar-dark text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
          DIRECTORATE OF RESEARCH & INNOVATION
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-6 mb-4">
          Empowering the Next Generation of <span className="text-daystar-blue">African Creators</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200">
          Research <span className='text-daystar-blue font-bold'>→</span> Innovation <span className='text-daystar-blue'>→</span> Commercialisation <span className='text-daystar-blue'>→</span> Impact
          <br /><br />
        </p>
        <motion.div className="mt-10 text-daystar-blue hover:cursor-pointer text-center underline underline-offset-4" animate={isInView ? {
                    scale: [1, 1.2, 1],
                    textShadow: [
                      "0px 0px 0px rgba(0,0,0,0)", 
                      "0px 0px 10px rgba(0,102,204,0.3)", 
                      "0px 0px 0px rgba(0,0,0,0)"
                    ]
                    } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }} >
                    <a className="font-bold" target="_blank" href="https://daystar.odoo.com/event/du-brains-ai-conference-2026-16/page/introduction-brains-conference-2026-1">DU BRAINS AI CONFRENCE 2026 (May 7th-9th)</a>
                    
                  </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;