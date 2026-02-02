import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

const Partners = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const partners = ["./kenialogo.png", "./cyberprologo.png", "./du.png", "./qhalalogo.svg", "./ditalogo.png", "./ssehlogo.png", "./nacosti.jpg", "./ukid.svg", "./windlelogo.webp", "./wipo_logo.jpg"];

    // Container variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Logos will appear one by one
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section ref={ref} className="bg-slate-200 py-12 px-6 md:py-20">
            <div className="max-w-7xl mx-auto">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className='text-daystar-dark mb-12 text-3xl text-center font-bold'
                >
                    Meet Our Partners
                </motion.p>

                {/* Grid Layout: 2 columns on mobile, 3 on tablet, 6 on desktop */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center"
                >
                    {partners.map((src, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="w-full max-w-[140px] md:max-w-[180px] transition-all duration-300"
                        >
                            <img 
                                src={src} 
                                alt="Partner Logo" 
                                className="w-full h-auto object-contain" 
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Partners;