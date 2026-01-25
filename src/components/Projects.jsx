import React, { useRef } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";

const Projects = () => {
  const ref=useRef(null);
  const isInView= useInView(ref,{ once: false, margin:"-100px"});
  
  const projects = [
    { title: "Institutional Knowledge AI", category: "Innovation", desc: "Developing an AI-driven knowledge base for Daystar." },
    { title: "Urban Citizen Sensing & Open Data Platform", category: "Research", desc: "Redesigning social interfaces for Kenyan youth." },
    { title: "Daystar Research Collaboration Graph & Intelligence Hub", category: "Education", desc: "Improving digital resource access for remote students." },
    
  ];

  return (
    <motion.section ref={ref} className="max-w-7xl mx-auto py-16 px-20">
      <motion.h3 initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="text-3xl font-bold mb-10">Featured Projects</motion.h3>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <motion.div initial={{rotate: 0, opacity:0, y:40}} animate={isInView ? {opacity:1, y:0}: {}} whileHover={{scale:1.1}} transition={{duration:1, ease:easeOut}} key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-daystar-blue transition-colors">
              <Lightbulb className="text-daystar-blue group-hover:text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-daystar-blue uppercase tracking-widest">{proj.category}</span>
            <h4 className="text-xl font-bold mt-2 mb-3">{proj.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{proj.desc}</p>
            <button className="flex items-center gap-2 text-daystar-blue font-bold text-sm">
              Visit Site <ChevronRight size={16} />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;