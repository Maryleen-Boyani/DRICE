import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Zap, Target, Sparkles, ArrowLeft, Lightbulb, ClipboardCheck } from 'lucide-react';
import VCInnovationForm from './VCInnovationForm';
import InternalGrantForm from './InternalGrantForm';

const Grants = () => {
    const [view, setView] = useState('landing');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const grantTypes = [
        {
            id: 'vc-innovation',
            title: "Innovation & Commercialization Grant",
            subtitle: "VC'S RESEARCH & INNOVATION",
            description: "Supporting high-potential innovations from proof-of-concept to market-ready products. Open to faculty, staff, students, and university-linked enterprises.",
            colorClass: "bg-daystar-blue",
            footerTag: "Up to 10 awardees",
            deadline: "10 May 2026",
            cycle: "2025/2026",
            eligibility: "Staff & Students"
        },
        {
            id: 'internal-research',
            title: "Internal Research Grant",
            subtitle: "STAFF RESEARCH FUND",
            description: "Strengthening Daystar's research culture by funding interdisciplinary, impact-oriented research aligned to the University's mission and national priorities.",
            colorClass: "bg-daystar-dark",
            footerTag: "KSh 800,000 max",
            deadline: "10 May 2026",
            cycle: "2025/2026",
            eligibility: "Full-Time Staff"
        }
    ];

    const renderView = () => {
        switch (view) {
            case 'vc-innovation':
                return <VCInnovationForm onBack={() => setView('landing')} />;
            case 'internal-research':
                return <InternalGrantForm onBack={() => setView('landing')} />;
            case 'landing':
            default:
                return (
                    <div ref={ref} className="max-w-7xl mx-auto px-6 py-12">
                        {/* High-Attention Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="text-center mb-16 space-y-4"
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                                Available Grants
                            </h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                Transform your ideas into impact. Explore our 2025/2026 funding opportunities
                                designed for the Daystar University research and innovation community.
                            </p>
                        </motion.div>

                        {/* Equidistant 50/50 Grid */}
                        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
                            {grantTypes.map((grant, idx) => (
                                <motion.div
                                    key={grant.id}
                                    initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col group"
                                >
                                    {/* Header Section */}
                                    <div className={`${grant.colorClass} p-10 text-white relative overflow-hidden`}>
                                        <div className="absolute top-[-20px] right-[-20px] bg-white/10 w-40 h-40 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />

                                        <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-70 mb-2">{grant.subtitle}</p>
                                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">{grant.title}</h3>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-10 flex flex-col flex-grow">
                                        <p className="text-slate-600 text-lg mb-8 flex-grow leading-relaxed">
                                            {grant.description}
                                        </p>

                                        <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-6 mb-10">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Deadline</p>
                                                <p className="text-base font-bold text-slate-900">{grant.deadline}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Value</p>
                                                <p className="text-base font-bold text-slate-900">{grant.footerTag}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Eligibility</p>
                                                <p className="text-base font-bold text-slate-900">{grant.eligibility}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setView(grant.id)}
                                            className="w-full py-5 bg-daystar-blue text-white rounded-2xl hover:bg-daystar-dark transition-all duration-300 font-bold flex items-center justify-center gap-3 group shadow-lg shadow-blue-100"
                                        >
                                            Apply Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {renderView()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Grants;