import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, TrendingUp, ShieldCheck, Users, Briefcase } from 'lucide-react';
import TeamSection from './Shared/TeamSection';
import BudgetTable from './Shared/BudgetTable';
import FormHeader from './Shared/FormHeader';

const VCInnovationForm = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Applicant
        category: '', studentLevel: '', staffId: '', school: '', prevGrant: 'No',
        // Section 2: Team
        team: [{ name: '', role: '', id: '', email: '' }], facultyMentor: '',
        // Section 3: Innovation
        title: '', stage: '', sector: '', problem: '', solution: '', valueProp: '',
        // Section 4: Research Linkage
        isLinked: 'No', researchRef: '',
        // Section 5: Commercialization
        revenueModel: '', marketSize: '', competition: '', traction: '',
        // Section 6: Funding
        requestedAmount: '',
        // Section 7: IP Status
        ipStatus: '', jointIPConsent: false, equityConsent: false,
        // Section 10: Declaration
        applicantName: '', date: '',
        // Section 11: Attachments
        attachments: { cv: false, mvpPhotos: false, demoVideo: false }
    });

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            <FormHeader
                title="VC'S RESEARCH, INNOVATION & COMMERCIALIZATION GRANT"
                subtitle="2025/2026 Concept Note Application"
                deadline="10 May 2026 | 5:00 PM EAT"
            />

            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
                <div className="bg-orange-600 px-8 py-3 text-white flex justify-between items-center">
                    <span className="font-medium">Section {step} of 11</span>
                    <div className="text-xs opacity-80 italic">Up to 10 successful applicants supported</div>
                </div>

                <form className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-700"><Users size={24} /> Section 1: Applicant Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <select className="p-3 border-2 border-slate-100 rounded-xl focus:border-orange-500 outline-none">
                                    <option>Applicant Category *</option>
                                    <option>Full-time staff (teaching)</option>
                                    <option>Full-time staff (non-teaching)</option>
                                    <option>Student</option>
                                    <option>Incubatee</option>
                                </select>
                                <input type="text" placeholder="Student / Staff ID Number *" className="p-3 border-2 border-slate-100 rounded-xl" />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-700"><Lightbulb size={24} /> Section 3: Innovation Overview</h3>
                            <select className="w-full p-3 border-2 border-slate-100 rounded-xl">
                                <option>Current Innovation Stage *</option>
                                <option>Proof of concept</option>
                                <option>Prototype / MVP</option>
                                <option>Pilot / Testing</option>
                                <option>Early market / Scaling</option>
                            </select>
                            <textarea placeholder="What problem does this solve? (Max 250 words) *" className="w-full p-4 border-2 border-slate-100 rounded-xl h-32"></textarea>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-orange-700"><ShieldCheck size={24} /> Section 7: Intellectual Property</h3>
                            <div className="space-y-4 bg-orange-50 p-6 rounded-2xl border border-orange-200">
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 rounded" />
                                    <span className="text-sm font-medium">I accept joint IP registration with Daystar University</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 rounded" />
                                    <span className="text-sm font-medium">I am willing to enter a negotiated equity arrangement</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex justify-between items-center">
                        <button type="button" onClick={step === 1 ? onBack : prevStep} className="text-slate-400 font-bold hover:text-orange-600 transition-colors">
                            {step === 1 ? 'Exit Form' : 'Go Back'}
                        </button>
                        <button type="button" onClick={() => setStep(s => s + 1)} className="bg-orange-600 text-white px-12 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
                            {step === 11 ? 'Submit Concept Note' : 'Next Section'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VCInnovationForm;