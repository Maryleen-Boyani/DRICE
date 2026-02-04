import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

const Events = () => {
  const events = [
    {
      name: "AI & Data Modelling Workshop",
      status: "Upcoming",
      date: "Feb 15, 2026",
      image: "./ai.jpg",
    },
    {
      name: "DRICE Innovation Summit",
      status: "Past",
      date:"Jan 23, 2026",
      image: "./innovation.jpg",
    },
    {
      name: "Graduate Research Seminar",
      status: "Upcoming",
      date: "March 10, 2026",
      image: "./seminar.jpg",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section ref={ref} initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="max-w-7xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-daystar-dark mb-4">Events & Trainings</h2>
        <p className="text-gray-500">Stay updated with the latest research workshops and summits</p>
      </div>

      <motion.div initial={{opacity:0, y:30}} animate={isInView ? {opacity:1, y:0}:{}} transition={{duration:2 , ease:"easeOut"}} className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-2 px-4 scrollbar-hide">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="min-w-[300px] flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Event Image */}
            <img 
              src={event.image} 
              alt={event.name} 
              className="w-full h-48 object-cover" 
            />

            <div className="p-5">
              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                event.status === 'Upcoming' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {event.status}
              </span>

              <h3 className="text-lg font-bold text-slate-800 mt-3">{event.name}</h3>
              
              {/* Conditional Date Rendering */}
              {/* {event.status === "Upcoming" && ( */}
                <p className="text-daystar-blue text-sm mt-2 font-medium">
                  Date: {event.date}
                </p>
              {/* )} */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Events;