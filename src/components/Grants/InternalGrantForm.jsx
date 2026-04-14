import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { flattenFormData, jsonToCSV } from '../../utils/formUtils';
import TeamSection from './Shared/TeamSection';
import BudgetTable from './Shared/BudgetTable';
import FormHeader from './Shared/FormHeader';

const InternalGrantForm = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState({ submitting: false, success: false, error: null });
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

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            const flattened = flattenFormData(formData);
            const csvData = jsonToCSV(flattened);

            const templateParams = {
                applicant_name: `${formData.firstName} ${formData.lastName}` || 'Applicant',
                grant_type: "Internal Research Grant",
                receipt_email: 'drice@daystar.ac.ke',
                json_data: JSON.stringify(formData, null, 2),
                csv_payload: csvData
            };

            // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
            
            console.log("INTERNAL GRANT - FINAL JSON:", formData);
            console.log("INTERNAL GRANT - CONVERTED CSV:", csvData);

            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus({ submitting: false, success: true, error: null });
        } catch (err) {
            console.error("Submission error:", err);
            setStatus({ submitting: false, success: false, error: "Submission failed. Please try again." });
        }
    };

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
                            <div key={i} className={`h-1.5 w-6 rounded-full ${step > i ? 'bg-daystar-blue' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </div>

                <form className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">1. Eligibility Confirmation</h3>
                            <div className="grid md:grid-cols-2 gap-6 p-6 bg-blue-50/30 rounded-xl border border-blue-100/50">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">1.1 Full-time staff member? *</label>
                                    <select 
                                        value={formData.isFullTime}
                                        onChange={(e) => updateField('isFullTime', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">1.3 Active internal grant? *</label>
                                    <select 
                                        value={formData.hasActiveGrant}
                                        onChange={(e) => updateField('hasActiveGrant', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
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
                            <h3 className="text-xl font-bold flex items-center gap-2">2. Principal Investigator Details</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    value={formData.firstName}
                                    onChange={(e) => updateField('firstName', e.target.value)}
                                    placeholder="First Name *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    value={formData.lastName}
                                    onChange={(e) => updateField('lastName', e.target.value)}
                                    placeholder="Last Name *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    value={formData.staffId}
                                    onChange={(e) => updateField('staffId', e.target.value)}
                                    placeholder="Staff ID (DU-XXXX) *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="Institutional Email *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    placeholder="Phone (+254...) *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    value={formData.school}
                                    onChange={(e) => updateField('school', e.target.value)}
                                    placeholder="School / Faculty *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">3. Project Team</h3>
                            <TeamSection data={formData.team} onTeamChange={(team) => updateField('team', team)} isInnovation={false} />
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">7. Itemized Budget</h3>
                            <BudgetTable 
                                budget={formData.budget} 
                                onBudgetChange={(budget) => updateField('budget', budget)} 
                                isInnovation={false} 
                                max={800000} 
                            />
                        </div>
                    )}

                    {step === 9 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">9. PI Declaration</h3>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    value={formData.piSignature}
                                    onChange={(e) => updateField('piSignature', e.target.value)}
                                    placeholder="PI Full Name (Signature) *" 
                                    className="w-full p-3 border rounded-lg" 
                                    required 
                                />
                                <input 
                                    type="date" 
                                    value={formData.date}
                                    onChange={(e) => updateField('date', e.target.value)}
                                    className="w-full p-3 border rounded-lg" 
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 10 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-red-600">10. Attachments Checklist</h3>
                            <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-dashed border-slate-400">
                                {[
                                    "Completed Application Form",
                                    "Technical Proposal (Max 10 pages)",
                                    "Principal Investigator CV",
                                    "Ethics Approval / Pending Letter",
                                    "Gantt Chart"
                                ].map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5" 
                                        />
                                        <span className="text-slate-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                                Submit completed applications to: <strong>drice@daystar.ac.ke</strong>
                            </div>
                        </div>
                    )}

                    {status.error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mt-6 font-medium">
                            {status.error}
                        </div>
                    )}

                    {status.success && (
                        <div className="p-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                <ClipboardCheck size={40} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Application Received!</h2>
                                <p className="text-slate-500 max-w-md mx-auto text-lg">Your Internal Research Grant application has been successfully transmitted to DRICE for review.</p>
                            </div>
                            <button type="button" onClick={onBack} className="bg-daystar-blue text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200">Return to Portal</button>
                        </div>
                    )}

                    {!status.success && (
                        <div className="mt-10 flex justify-between border-t pt-6">
                            <button type="button" onClick={step === 1 ? onBack : prevStep} disabled={status.submitting} className="px-6 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
                                {step === 1 ? 'Cancel' : 'Previous Section'}
                            </button>
                            <button 
                                type="button" 
                                onClick={step === 10 ? handleSubmit : nextStep} 
                                disabled={status.submitting}
                                className={`px-10 py-2 rounded-xl font-bold text-white transition-all disabled:opacity-50 ${step === 10 ? 'bg-daystar-blue shadow-lg shadow-blue-100' : 'bg-daystar-dark hover:bg-slate-800'}`}
                            >
                                {status.submitting ? 'Submitting...' : (step === 10 ? 'Submit Final Application' : 'Save & Continue')}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default InternalGrantForm;