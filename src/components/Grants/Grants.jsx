import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, ClipboardCheck, Sparkles, Target, Zap } from 'lucide-react';
import VCInnovationForm from './VCInnovationForm';
import InternalGrantForm from './InternalGrantForm';

const Grants = () => {
    const [view, setView] = useState('landing');

    const grantTypes = [
        {
            id: 'vc-innovation',
            title: "VC'S RESEARCH, INNOVATION & COMMERCIALIZATION GRANT",
            subtitle: "2025/2026 Concept Note",
            description: "Targeting high-impact innovations with commercial potential. Up to 10 successful applicants supported.",
            icon: <Zap className="text-orange-500" size={32} />,
            color: "orange",
            deadline: "10 May 2026",
            features: ["Commercial Potential", "Joint IP Registration", "Interdisciplinary Teams"]
        },
        {
            id: 'internal-research',
            title: "2025/2026 INTERNAL RESEARCH GRANT",
            subtitle: "Full Application Form",
            description: "Supporting primary research across all academic disciplines within Daystar University.",
            icon: <Target className="text-emerald-500" size={32} />,
            color: "emerald",
            deadline: "10 May 2026",
            features: ["Academic Rigor", "Publication Focused", "Faculty Support"]
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
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-4"
                            >
                                <Sparkles size={16} /> DRICE GRANTS PORTAL
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
                            >
                                Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Research Journey</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-600 text-lg max-w-2xl mx-auto"
                            >
                                Select a grant category below to begin your application. Our portal guides you through every step of the process.
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-20">
                            {grantTypes.map((grant, idx) => (
                                <motion.div
                                    key={grant.id}
                                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setView(grant.id)}
                                    className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
                                        grant.color === 'orange' 
                                        ? 'border-orange-100 hover:border-orange-500 bg-orange-50/30' 
                                        : 'border-emerald-100 hover:border-emerald-500 bg-emerald-50/30'
                                    }`}
                                >
                                    <div className="p-8 md:p-10 flex flex-col h-full">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300 ${
                                            grant.color === 'orange' ? 'bg-orange-100' : 'bg-emerald-100'
                                        }`}>
                                            {grant.icon}
                                        </div>

                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{grant.title}</h2>
                                        <p className={`font-bold text-sm mb-6 ${
                                            grant.color === 'orange' ? 'text-orange-600' : 'text-emerald-600'
                                        }`}>{grant.subtitle}</p>
                                        
                                        <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                                            {grant.description}
                                        </p>

                                        <div className="space-y-3 mb-10">
                                            {grant.features.map(feature => (
                                                <div key={feature} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${grant.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                                            <div className="text-sm">
                                                <span className="text-slate-400 block font-medium">Deadline</span>
                                                <span className="font-bold text-slate-900">{grant.deadline}</span>
                                            </div>
                                            <button className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
                                                grant.color === 'orange' 
                                                ? 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700' 
                                                : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700'
                                            }`}>
                                                Start Application
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative background glow */}
                                    <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity group-hover:opacity-40 ${
                                        grant.color === 'orange' ? 'bg-orange-400' : 'bg-emerald-400'
                                    }`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderView()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Grants;
