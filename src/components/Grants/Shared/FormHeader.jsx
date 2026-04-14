import React from 'react';
import { Calendar, Award, Clock, BookOpen, Lightbulb } from 'lucide-react';

/**
 * FormHeader - Consistent branding for all grant forms
 * @param {string} title - Main grant name
 * @param {string} subtitle - Secondary description or year
 * @param {string} deadline - Application closing date
 * @param {string} maxAward - Optional award limit text
 * @param {number} citeId - Reference ID for styling (1 for Internal, 135 for VC)
 */
const FormHeader = ({ title, subtitle, deadline, maxAward, citeId }) => {
    const isVC = citeId === 135;

    return (
        <div className={`relative overflow-hidden p-8 text-white ${isVC ? 'bg-daystar-blue' : 'bg-daystar-dark'
            }`}>
            {/* Decorative Background Icon */}

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                                Official Application
                            </span>
                            {isVC && (
                                <span className="px-3 py-1 bg-orange-400/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-orange-200/30">
                                    Pitch-based Selection
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-white/80 font-medium max-w-2xl">
                            {subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 shrink-0">
                        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                            <div className={`p-2 rounded-lg ${isVC ? 'bg-blue-500' : 'bg-daystar-blue'}`}>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/60 leading-none mb-1">Deadline</p>
                                <p className="text-sm font-bold">{deadline}</p>
                            </div>
                        </div>

                        {maxAward && (
                            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                <div className={`p-2 rounded-lg ${isVC ? 'bg-blue-500' : 'bg-daystar-blue'}`}>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-white/60 leading-none mb-1">Grant Value</p>
                                    <p className="text-sm font-bold">{maxAward}</p>
                                </div>
                            </div>
                        )}

                        {isVC && (
                            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                                <div className="p-2 rounded-lg bg-blue-500">
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-white/60 leading-none mb-1">Submission Time</p>
                                    <p className="text-sm font-bold">By 5:00 PM EAT</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormHeader;