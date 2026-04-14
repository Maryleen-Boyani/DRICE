import React, { useState } from 'react';
import { ArrowLeft, Send, ClipboardCheck, AlertTriangle, FileText, Users, Calculator } from 'lucide-react';
import TeamSection from './Shared/TeamSection';
import BudgetTable from './Shared/BudgetTable';
import FormHeader from './Shared/FormHeader';

const InternalGrantForm = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Eligibility
        isFullTime: '', academicRank: '', otherRank: '', hasActiveGrant: '',
        // Section 2: PI Details
        firstName: '', lastName: '', staffId: '', email: '', phone: '', orcid: '', school: '', department: '', researchArea: '',
        // Section 3: Co-Investigators
        team: [{ name: '', institution: '', role: '', email: '' }],
        // Section 4: Project Overview
        projectTitle: '', primaryTheme: '', otherTheme: '', projectApproach: '',
        // Section 5: Technical Proposal (Briefs)
        abstract: '', problemStatement: '', objectives: '', methodology: '', significance: '',
        // Section 6: Work Plan
        durationMonths: '12', ganttStatus: '',
        // Section 7: Budget
        budget: [{ item: '', category: '', amount: '', justification: '' }],
        totalAmount: 0,
        // Section 8: Ethical Considerations
        requiresEthics: '', ethicsStatus: '',
        // Section 9: Declaration
        piSignature: '', date: '', hodName: '', hodEmail: '',
        // Section 10: Checklist
        checklist: { form: true, proposal: false, piCv: false, coIvCv: false, ethics: false, gantt: false }
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            <FormHeader
                title="2025/2026 INTERNAL RESEARCH GRANT"
                subtitle="Full Application Form - Directorate of Research, Innovation, Commercialization & Entrepreneurship"
                deadline="10 May 2026"
            />

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                <div className="bg-slate-50 border-b px-8 py-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Section {step} of 10</span>
                    <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`h-1.5 w-6 rounded-full ${step > i ? 'bg-green-600' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </div>

                <form className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2"><ClipboardCheck className="text-green-600" /> 1. Eligibility Confirmation</h3>
                            <div className="grid md:grid-cols-2 gap-6 p-6 bg-green-50 rounded-xl">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">1.1 Full-time staff member? *</label>
                                    <select className="w-full p-2 rounded border" required>
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">1.3 Active internal grant? *</label>
                                    <select className="w-full p-2 rounded border" required>
                                        <option value="">Select...</option>
                                        <option value="No">No (Eligible)</option>
                                        <option value="Yes">Yes (Ineligible)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2"><FileText className="text-green-600" /> 2. Principal Investigator Details</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name *" className="p-3 border rounded-lg" required />
                                <input type="text" placeholder="Last Name *" className="p-3 border rounded-lg" required />
                                <input type="text" placeholder="Staff ID (DU-XXXX) *" className="p-3 border rounded-lg" required />
                                <input type="email" placeholder="Institutional Email *" className="p-3 border rounded-lg" required />
                                <input type="text" placeholder="Phone (+254...) *" className="p-3 border rounded-lg" required />
                                <input type="text" placeholder="School / Faculty *" className="p-3 border rounded-lg" required />
                            </div>
                        </div>
                    )}

                    {/* ... Sections 3 through 9 would follow same pattern ... */}

                    {step === 10 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-red-600"><AlertTriangle /> 10. Attachments Checklist</h3>
                            <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-dashed border-slate-400">
                                {[
                                    "Completed Application Form",
                                    "Technical Proposal (Max 10 pages)",
                                    "Principal Investigator CV",
                                    "Ethics Approval / Pending Letter",
                                    "Gantt Chart"
                                ].map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors">
                                        <input type="checkbox" className="w-5 h-5" />
                                        <span className="text-slate-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                                Submit completed applications to: <strong>drice@daystar.ac.ke</strong>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex justify-between border-t pt-6">
                        <button type="button" onClick={step === 1 ? onBack : prevStep} className="px-6 py-2 border rounded-xl font-semibold text-slate-600">
                            {step === 1 ? 'Cancel' : 'Previous Section'}
                        </button>
                        <button type="button" onClick={step === 10 ? undefined : nextStep} className={`px-10 py-2 rounded-xl font-bold text-white ${step === 10 ? 'bg-green-600' : 'bg-indigo-600'}`}>
                            {step === 10 ? 'Submit Final Application' : 'Save & Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InternalGrantForm;