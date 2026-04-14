import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { flattenFormData, jsonToCSV } from '../../utils/formUtils';
import TeamSection from './Shared/TeamSection';
import BudgetTable from './Shared/BudgetTable';
import FormHeader from './Shared/FormHeader';

const VCInnovationForm = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState({ submitting: false, success: false, error: null });
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
        budget: [], requestedAmount: '',
        // Section 7: IP Status
        ipStatus: '', jointIPConsent: false, equityConsent: false,
        // Section 10: Declaration
        applicantName: '', date: '',
        // Section 11: Attachments
        attachments: { cv: false, mvpPhotos: false, demoVideo: false }
    });

    const updateField = (section, field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        // Simple validation before going next
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            const flattened = flattenFormData(formData);
            const csvData = jsonToCSV(flattened);

            // Prepare EmailJS params
            // Note: Template keys should match your EmailJS configuration
            const templateParams = {
                applicant_name: formData.applicantName || 'Applicant',
                grant_type: "VC Innovation & Commercialization Grant",
                receipt_email: 'drice@daystar.ac.ke',
                json_data: JSON.stringify(formData, null, 2),
                csv_payload: csvData
            };

            // Replace with your Service ID, Template ID, and Public Key
            // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
            
            // For now, we simulate and log to demonstrate the JSON -> CSV flow
            console.log("FINAL JSON:", formData);
            console.log("CONVERTED CSV:", csvData);

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            setStatus({ submitting: false, success: true, error: null });
        } catch (err) {
            console.error("Submission error:", err);
            setStatus({ submitting: false, success: false, error: "Failed to send application. Please try again." });
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            <FormHeader
                title="VC'S RESEARCH, INNOVATION & COMMERCIALIZATION GRANT"
                subtitle="2025/2026 Concept Note Application"
                deadline="10 May 2026 | 5:00 PM EAT"
            />

            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
                <div className="bg-daystar-blue px-8 py-3 text-white flex justify-between items-center">
                    <span className="font-medium">Section {step} of 11</span>
                    <div className="text-xs opacity-80 italic">Up to 10 successful applicants supported</div>
                </div>

                <form className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 1: Applicant Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <select 
                                    value={formData.category}
                                    onChange={(e) => updateField(1, 'category', e.target.value)}
                                    className="p-3 border-2 border-slate-100 rounded-xl focus:border-daystar-blue outline-none"
                                >
                                    <option value="">Applicant Category *</option>
                                    <option>Full-time staff (teaching)</option>
                                    <option>Full-time staff (non-teaching)</option>
                                    <option>Student</option>
                                    <option>Incubatee</option>
                                </select>
                                <input 
                                    type="text" 
                                    value={formData.staffId}
                                    onChange={(e) => updateField(1, 'staffId', e.target.value)}
                                    placeholder="Student / Staff ID Number *" 
                                    className="p-3 border-2 border-slate-100 rounded-xl" 
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 2: Innovation Team</h3>
                            <TeamSection 
                                data={formData.team} 
                                onTeamChange={(newTeam) => updateField(2, 'team', newTeam)} 
                                isInnovation={true} 
                            />
                            <div className="mt-8">
                                <label className="block text-sm font-semibold mb-2">Primary Faculty Mentor / Supervisor *</label>
                                <input 
                                    type="text" 
                                    value={formData.facultyMentor}
                                    onChange={(e) => updateField(2, 'facultyMentor', e.target.value)}
                                    placeholder="Full Name and Department" 
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-daystar-blue outline-none" 
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 3: Innovation Overview</h3>
                            <input 
                                type="text" 
                                value={formData.title}
                                onChange={(e) => updateField(3, 'title', e.target.value)}
                                placeholder="Final Innovation Title *" 
                                className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                            />
                            <select 
                                value={formData.stage}
                                onChange={(e) => updateField(3, 'stage', e.target.value)}
                                className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4"
                            >
                                <option value="">Current Innovation Stage *</option>
                                <option>Proof of concept</option>
                                <option>Prototype / MVP</option>
                                <option>Pilot / Testing</option>
                                <option>Early market / Scaling</option>
                            </select>
                            <textarea 
                                value={formData.problem}
                                onChange={(e) => updateField(3, 'problem', e.target.value)}
                                placeholder="What problem does this solve? (Max 250 words) *" 
                                className="w-full p-4 border-2 border-slate-100 rounded-xl h-32"
                            ></textarea>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 6: Funding Requirements</h3>
                            <BudgetTable 
                                budget={formData.budget || []} 
                                onBudgetChange={(newBudget) => updateField(6, 'budget', newBudget)} 
                                isInnovation={true} 
                                max={1000000} 
                            />
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 7: Intellectual Property</h3>
                            <div className="space-y-4 bg-blue-50 p-6 rounded-2xl border border-blue-200">
                                <label className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        checked={formData.jointIPConsent}
                                        onChange={(e) => updateField(7, 'jointIPConsent', e.target.checked)}
                                        className="w-5 h-5 rounded" 
                                    />
                                    <span className="text-sm font-medium">I accept joint IP registration with Daystar University</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        checked={formData.equityConsent}
                                        onChange={(e) => updateField(7, 'equityConsent', e.target.checked)}
                                        className="w-5 h-5 rounded" 
                                    />
                                    <span className="text-sm font-medium">I am willing to enter a negotiated equity arrangement</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {step === 10 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 10: Final Declaration</h3>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    value={formData.applicantName || ''}
                                    onChange={(e) => updateField(10, 'applicantName', e.target.value)}
                                    placeholder="Full Name (Digital Signature) *" 
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl" 
                                />
                                <input 
                                    type="date" 
                                    value={formData.date}
                                    onChange={(e) => updateField(10, 'date', e.target.value)}
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl" 
                                />
                            </div>
                        </div>
                    )}

                    {status.error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mt-6 font-medium">
                            {status.error}
                        </div>
                    )}

                    {status.success && (
                        <div className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Application Submitted!</h2>
                            <p className="text-slate-500">Your concept note for the VC Innovation Grant has been shared with DRICE. You will receive a copy via email.</p>
                            <button type="button" onClick={onBack} className="bg-daystar-blue text-white px-8 py-3 rounded-xl font-bold">Return to Portal</button>
                        </div>
                    )}

                    {!status.success && (
                        <div className="mt-12 flex justify-between items-center">
                            <button type="button" onClick={step === 1 ? onBack : prevStep} disabled={status.submitting} className="text-slate-400 font-bold hover:text-daystar-blue transition-colors disabled:opacity-50">
                                {step === 1 ? 'Exit Form' : 'Go Back'}
                            </button>
                            <button 
                                type="button" 
                                onClick={step === 11 ? handleSubmit : nextStep} 
                                disabled={status.submitting}
                                className="bg-daystar-blue text-white px-12 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-daystar-dark transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {status.submitting ? 'Processing...' : (step === 11 ? 'Submit Concept Note' : 'Next Section')}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default VCInnovationForm;