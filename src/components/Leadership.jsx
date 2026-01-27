import { image, img } from 'framer-motion/client';
import React, {useRef} from 'react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";


const Leadership = () => {
  const leaders = [
    { name: "Dr. Caro Ayuya", title: "Director - DRICE", img:"./dr.ayuya.jpg"},
    { name: "Dr. Japheth Mursi", title: "Deputy Director - DRICE", img:"./dr.mursi.jpg"},
    { name: "Philipe Tinega", title: "Administrator - DRICE" },
    { name: "John Nderitu", title: "Innovation Officer - DRICE", img:"./john.jpg"},
    { name: "Vivian Angula", title: "Research Assistant - DRICE" }
  ];
  const ref=useRef(null);
  const isInView= useInView(ref,{ once: false, margin:"-100px"});

  return (
    <motion.section ref={ref} className="max-w-7xl mx-auto py-20 px-6">
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4">Our Leadership</h2>
        <p className="text-gray-500 italic">"Excellence, Transformation, Servant Leadership"</p>
      </motion.div>
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="grid grid-cols-1 sm:grid-cols-3 gap-12">
        {leaders.map((leader, i) => (
          <div key={i} className="text-center group">
            <div className="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-6 border-4 border-white shadow-lg group-hover:border-daystar-blue transition-all overflow-hidden">
               <img src={leader.img} alt={leader.name} />
            </div>
            <h4 className="text-xl font-bold">{leader.name}</h4>
            <p className="text-daystar-blue font-semibold">{leader.role}</p>
            <br />
            <p className="text-daystar-blue font-bold text-sm">{leader.title}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Leadership;