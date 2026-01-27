import React, { useRef } from 'react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";

const About = () => {
  const ref=useRef(null);
  const isInView= useInView(ref,{ once: false, margin:"-100px"});
   
  return (
    
    <motion.section ref={ref} className="py-20 px-10 bg-white">
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
       
        <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="w-full md:w-1/2">
          <div className="relative">
            <div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="absolute -top-4 -left-4 w-full h-full border-2 border-daystar-blue rounded-2xl z-0" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="Students Collaborating" 
              className="relative z-10 rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </motion.div>

        
        <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="w-full md:w-1/2 space-y-6">
          <h3 className="text-3xl font-bold text-daystar-dark">About DRICE</h3>
          <div className="w-20 h-1.5 bg-daystar-blue rounded-full" />
          <p className="text-gray-600 leading-relaxed text-lg">
            The Directorate of Research, Innovation, Commercialization, and Entrepreneurship (DRICE) 
            serves as the heartbeat of progress at Daystar University. We facilitate cutting-edge 
            research that addresses societal challenges while fostering a culture of entrepreneurship.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to ensure that every breakthrough made in our lecture rooms finds its way 
            into the commercial market, creating jobs and solving problems across Kenya and beyond.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;