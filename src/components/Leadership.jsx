import { image, img } from 'framer-motion/client';
import React, {useRef} from 'react';
import {degrees, easeIn, easeOut, motion, useInView} from "framer-motion";
import { ChevronRight } from 'lucide-react';
// import {createIcons, Linkedin} from 'lucide-react';

const Leadership = () => {
  const leaders = [
    { name: "Dr. Caroline Ayuya", title: "Director - Daystar Research, Innovation, Commertialization & Entrepreneurship", img:"./dr.ayuya.jpg", href:"https://www.linkedin.com/in/dr-caroline-ayuya-muaka-77b9491b"},
    { name: "Dr. Japheth Mursi", title: "Deputy Director - Daystar Research, Innovation, Commertialization & Entrepreneurship", img:"./dr.mursi.jpg", href:"https://www.linkedin.com/in/japheth-mursi "},
    { name: "Philipe Tinega", title: "Administrator - Daystar Research, Innovation, Commertialization & Entrepreneurship", img:"./philipe.jpg", href:"https://www.linkedin.com/in/philippe-tinega-304910197 "},
    { name: "John Nderitu", title: "Innovation Officer - Daystar Research, Innovation, Commertialization & Entrepreneurship", img:"./john.jpg", href:"https://www.linkedin.com/in/john-nderitu-8b38aa244 "},
    { name: "Vivian Angula", title: "Daystar Research Assistant - Research, Innovation, Commertialization & Entrepreneurship",img:"./vivian.jpeg", href:"https://www.linkedin.com/in/"}
  ];
  const ref=useRef(null);
  const isInView= useInView(ref,{ once: false, margin:"-100px"});

  return (
    <motion.section ref={ref} className="max-w-7xl mx-auto py-20 px-6">
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4">Our Leadership</h2>
        <p className="text-gray-500 italic">"Excellence, Transformation, Servant Leadership"</p>
      </motion.div>
      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="sm:grid-cols-3 gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader, i) => (
          <div key={i} className="text-center group py-6 px-2 rounded-2xl">
            <div className="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-6 border-4 border-white shadow-lg group-hover:border-daystar-blue transition-all overflow-hidden">
               <img src={leader.img} alt={leader.name} />
            </div>
            <div>

            </div>
            <h4 className="text-xl font-bold">{leader.name}</h4>           
            
            <p className="text-daystar-blue text-center italic font-medium mb-3 text-sm max-w-[220px] md:max-w-[260px] mx-auto leading-relaxed tracking-wide">{leader.title}</p>
            {/* <a href={leader.href}>
              <button className='text-gray'>LinkedIn </button>
            </a> */}
            {/* <Linkedin size={20}/> */}
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Leadership;