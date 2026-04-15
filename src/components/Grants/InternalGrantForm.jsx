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
        firstName: '', lastName: '', staffId: '', email: '', phone: '', orcid: '', school: '', department: '', researchArea: '', previousGrants: '',
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
{/* collecting form responses starts here */}
                <form className="p-8">
                    {/* eligibility  */}
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
                                    <label className="block text-sm font-semibold mb-2">1.2 Current academic rank? *</label>
                                    <select 
                                        value={formData.academicRank}
                                        onChange={(e) => updateField('academicRank', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="lect">Lecturer</option>
                                        <option value="senior_lecturer">Senior Lecturer</option>
                                        <option value="associate_professor">Associate Professor</option>
                                        <option value="professor">Professor</option>
                                        <option value="other">Other </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">1.2 Active internal grant? *</label>
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
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">First Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="First Name *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input 
                                    type="text" 
                                    value={formData.lastName}
                                    onChange={(e) => updateField('lastName', e.target.value)}
                                    placeholder="Last Name *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="staffId" required >Staff ID</label>
                                    <input 
                                    type="text" 
                                    value={formData.staffId}
                                    onChange={(e) => updateField('staffId', e.target.value)}
                                    placeholder="Staff ID (DU-XXXX) *" 
                                    className="p-3 border rounded-lg" 
                                    
                                    />
                                    
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="email" required >Institutional Email</label>
                                    <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="name@daystar.ac.ke" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="phone" required >Phone Number</label>
                                    <input 
                                    type="text" 
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    placeholder="Phone (+254...) " 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="orcid" required >ORCID / ResearchGate ID (if applicable)</label>
                                    <input 
                                    type="text" 
                                    value={formData.orcid}
                                    onChange={(e) => updateField('orcid', e.target.value)}
                                    placeholder="" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="school" required >School/ Faculty</label>
                                    <input 
                                    type="text" 
                                    value={formData.school}
                                    onChange={(e) => updateField('school', e.target.value)}
                                    placeholder="" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="department" required >Department</label>
                                    <input 
                                    type="text" 
                                    value={formData.department}
                                    onChange={(e) => updateField('department', e.target.value)}
                                    placeholder="Department *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="researchArea" required >Research area / area of specialization</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.researchArea}
                                        onChange={(e) => updateField('researchArea', e.target.value)}
                                        placeholder="" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="previousGrants" required >Previous research grants (last 5 years)</label>
                                    <textarea
                                        type="text" 
                                        value={formData.previousGrants}
                                        onChange={(e) => updateField('previousGrants', e.target.value)}
                                        placeholder="List any externally or internally funded projects: (Include Grant Name | Funder | Year | Amount | Status" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
{/* Matters team composition */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in">
                            {/* <h3 className="text-xl font-bold flex items-center gap-2">3. Research Team Composition</h3> */}
                            <TeamSection data={formData.team} onTeamChange={(team) => updateField('team', team)} isInnovation={false} />
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >Describe the role of each team member and the expertise they are bringing to the project</label>
                                <textarea
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder="Explain how each member contributes to the project and what expertise they bring." 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >Mentorship plan for early-career researchers and/or postgraduate students</label>
                                <textarea
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder=" Describe how junior team members will be mentored and developed through this project" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">4. Project Overview</h3>
                            
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >4.1 Project Title</label>
                                <textarea
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder="Clear and descriptive" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >4.2 Primary Thematic Area</label>
                                <select 
                                    value={formData.isFullTime}
                                    onChange={(e) => updateField('isFullTime', e.target.value)}
                                    className="w-full p-2 rounded border" 
                                    required
                                >
                                    <option value="">Select...</option>
                                    <option value="Yes">Education & Leadership</option>
                                    <option value="No">Health & Wellbeing</option>
                                    <option value="No">Theology & Ethics</option>
                                    <option value="No">Media & Communication</option>
                                    <option value="No">Business & Entrepreneurship</option>
                                    <option value="No">Governance & Justice</option>
                                    <option value="No">Climate & Environment</option>
                                    <option value="No">Science & AI</option>
                                    <option value="No">Cross-cutting/ Interdisciplinary</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >4.3 Secondary Thematic Area (If Applicable) </label>
                                <textarea
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder="" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="staffId" required >4.4 Research Approach</label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Qualitative</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Quantitative</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Mixed Methods</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Action Research</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Experimental/ Laboratory</span>
                                </label>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="staffId" required >Other</label>
                                    <input 
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder="Specify here" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="block text-sm font-semibold mb-2">4.5 Is this project interdisciplinary?</label>
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
                                <br />
                                <div>
                                    <label className="block text-sm font-semibold mb-2">4.6 Will this project involve human participants or sensitive data?</label>
                                    <select 
                                        value={formData.isFullTime}
                                        onChange={(e) => updateField('isFullTime', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="Yes">Yes- ethics approval obtained</option>
                                        <option value="">Yes- ethics approval pending</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <br />
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="staffId" required >4.7 Project Abstract </label>
                                    <textarea
                                            type="text" 
                                            value={formData.school}
                                            onChange={(e) => updateField('school', e.target.value)}
                                            placeholder="Summarize the problem, research approach and expected contribution" 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold">5. Technical Research Proposal</h3>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>5.1 Background & Justification</label>
                                <textarea 
                                    value={formData.problemStatement}
                                    onChange={(e) => updateField('problemStatement', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[120px]" 
                                    placeholder='Provide the context for your study. What is the current state of knowledge? What gap does this research address?'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>5.2 Problem Statement</label>
                                <textarea 
                                    value={formData.literatureReview}
                                    onChange={(e) => updateField('literatureReview', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[120px]" 
                                    placeholder='Clearly and concisely articulate the specific research problem being addressed.'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>5.3 Research Objectives</label>
                                <textarea 
                                    value={formData.theoreticalFramework}
                                    onChange={(e) => updateField('theoreticalFramework', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[120px]" 
                                    placeholder='State your main objective and specific sub-objectives. Example: 1. To examine... 2. To assess... 3. To develop...'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>5.4 Research Methodology</label>
                                <textarea 
                                    value={formData.methodology}
                                    onChange={(e) => updateField('methodology', e.target.value)}
                                    placeholder="Describe your research design, data collection methods, sampling strategy, and analysis approach. Demonstrate methodological rigor and feasibility."
                                    className="p-3 border rounded-lg min-h-[150px]" 
                                />
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold">6. Expected Outputs, Outcomes & Impact</h3>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>6.1 Primary Outputs</label>
                                <textarea 
                                    value={formData.expectedOutputs}
                                    onChange={(e) => updateField('expectedOutputs', e.target.value)}
                                    placeholder="List specific deliverables: e.g. peer-reviewed journal articles, conference papers, policy briefs, datasets, prototypes, technical reports."
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>6.2 Dissemination Plan </label>
                                <textarea 
                                    value={formData.disseminationPlan}
                                    onChange={(e) => updateField('disseminationPlan', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                    placeholder='How will findings be shared? Identify target journals, conferences, and community engagement activities. Note: findings must be presented at a Daystar University dissemination forum'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>6.3 Relevance to Policy, Community Transformation or Commercialization</label>
                                <textarea 
                                    value={formData.anticipatedImpact}
                                    onChange={(e) => updateField('anticipatedImpact', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                    placeholder='Describe any potential policy influence, community impact, innovation, or commercialization value.'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>6.4 Stakeholder and Community Involvement</label>
                                <textarea 
                                    value={formData.sustainabilityPlan}
                                    onChange={(e) => updateField('sustainabilityPlan', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                    placeholder='Identify any stakeholders, community partners, or external organizations involved in or benefiting from the research.'
                                />
                            </div>
                        </div>
                    )}
                    
                    {step === 7 && (
                        <div className="space-y-6 animate-in fade-in">
                            
                            <BudgetTable 
                                budget={formData.budget} 
                                onBudgetChange={(budget) => updateField('budget', budget)} 
                                isInnovation={false} 
                                max={800000} 
                            />
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'> Budget Justification Narrative</label>
                                <textarea 
                                    value={formData.sustainabilityPlan}
                                    onChange={(e) => updateField('sustainabilityPlan', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                    placeholder='Explain the rationale and necessity of each major expenditure. Demonstrate value for money.'
                                />
                            </div>
                        </div>
                    )}

                    {step === 8 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold uppercase">8. Work Plan & Implementation Schedule</h3>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>8.1 Detailed Timeline (Question 34)</label>
                                <textarea 
                                    value={formData.workPlanTimeline}
                                    onChange={(e) => updateField('workPlanTimeline', e.target.value)}
                                    placeholder="List activities you will work on during Month 1-3, Month 4-6, Month 7-9, Month 10-12 and the responsible person"
                                    className="p-3 border rounded-lg min-h-[120px]" 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>8.2 Key Milestones and Deliverables</label>
                                <textarea 
                                    value={formData.monitoringPlan}
                                    onChange={(e) => updateField('monitoringPlan', e.target.value)}
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                    placeholder='List your key milestones, target dates, and the responsible team member for each.'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>8.3 Potential Risks and Mitigation measures</label>
                                <textarea 
                                    value={formData.riskManagement}
                                    onChange={(e) => updateField('riskManagement', e.target.value)}
                                    placeholder="Identify key risks to successful implementation and describe your mitigation strategies."
                                    className="p-3 border rounded-lg min-h-[100px]" 
                                />
                            </div>
                        </div>
                    )}

                    {step === 9 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">9. PI Declaration</h3>
                            <div className="space-y-4">
                                <h5>Read all declarations carefully. By signing this form, the Principal Investigator confirms all statements below.</h5>
                                <p className='text-md font-bold'>I hereby declare that: *</p>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I am a full-time member of staff at Daystar University, currently at the rank of Lecturer or above.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I do not currently hold an active Daystar Internal Research Grant, or all obligations for any previous grant have been fully completed and formally closed.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>All information provided in this application is accurate, complete, and original to the best of my knowledge.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>If awarded, I will implement the project within the approved period and budget, and comply with all Daystar University research ethics, financial accountability, innovation, and intellectual property requirements.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I will submit quarterly technical and financial progress reports as required, and present findings at a Daystar University research dissemination forum.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I will acknowledge the Daystar University Internal Research Grant in all resulting publications, presentations, innovations, reports, and related outputs.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I understand the grant does not cover personal stipends, tuition, or costs unrelated to approved research activities.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I consent to the collection and processing of information in this application for grant evaluation and administration purposes.</span>
                                </label>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">PI Full Name (As Signature)</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Full Name " 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="firstName">Date</label>
                                        <input 
                                            type="date" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder="Full Name " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="firstName">Head of Department- Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="firstName">Head of Department- Email</label>
                                        <input 
                                            type="text" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="firstName">Head of Department- Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="firstName">Head of Department- Date</label>
                                        <input 
                                            type="date" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )}
                    {/* uploads start here */}
                    {step === 10 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-[1e293b]">10. Attachments Checklist</h3>
                            
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Technical Proposal document</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Principal Investigator CV </label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Co-Investigator CVs (If Applicable)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Research Assistant/ Postgraduate Student CVs (If Applicable)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Ethics Approval Certificate or Pending Application Letter (If Applicable)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Gantt Chart/ Detailed Implementation Schedule (Recommended)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Letters of Support from Partner Organizations (If Applicable)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Any other relevant supporting documents (If Applicable)</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                            </div>                             
                               
                            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                                All completed applications will be sent to: <strong>drice@daystar.ac.ke</strong>
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