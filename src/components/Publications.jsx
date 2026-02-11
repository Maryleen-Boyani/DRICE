import React, {useRef} from 'react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";
import { image, img, section} from 'framer-motion/client';
import { Download, FileText as Document} from 'lucide-react';
import { href } from 'react-router-dom';

const Publications = () => {
    const ref=useRef(null);
  const isInView= useInView(ref, {once: false, margin:"-100px"});
  return (
    <motion.section ref={ref} initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Our Publications</h2>
            <p className='text-gray-500'>Download publications from here</p>    
        </div>
        <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: "DECEMBER BULLETIN 2025", title: "Faculty and Postgraduate Publication and Innovation Spotlights", href:`${import.meta.env.BASE_URL}dec2025publication.pdf`},
              { type: "JULY BULLETIN 2025", title: "The Faculty and Postgraduate Publication Spotlights", href:`${import.meta.env.BASE_URL}july2025publication.pdf`},
                           
            ].map((item, i) => (
              <div key={i} className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
                <div className="p-3 bg-blue-50 text-daystar-blue rounded-lg mr-4">
                   <Document size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-daystar-blue uppercase">{item.type}</p>
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                </div>
                
                <a className="whitespace-nowrap ml-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2" href={item.href}><Download size={18} /></a> 
              </div>
            ))}
          </motion.div>
        
    </motion.section>  
  );
};

export default Publications;