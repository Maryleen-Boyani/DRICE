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
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Applicant Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName" className="block text-sm font-semibold mb-2">First Name</label>
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
                                    <label htmlFor="lastName" className="block text-sm font-semibold mb-2">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.lastName}
                                        onChange={(e) => updateField('lastName', e.target.value)}
                                        placeholder="Last Name *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Student Level (If Applicable)</label>
                                    <select 
                                        value={formData.studentLevel}
                                        onChange={(e) => updateField('studentLevel', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="No">Certificate</option>
                                        <option value="Yes">Diploma</option>
                                        <option value="Yes">Undergraduate</option>
                                        <option value="Yes">PG Diploma</option>
                                        <option value="Yes">Masters</option>
                                        <option value="Yes">Doctoral</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Applicant Category </label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => updateField(1, 'category', e.target.value)}
                                        className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-daystar-blue outline-none"
                                        required>
                                        <option value="">Applicant Category *</option>
                                        <option>Full-time staff (teaching)</option>
                                        <option>Full-time staff (non-teaching)</option>
                                        <option>Student</option>
                                        <option>Incubatee</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="staffId" required >ID Number</label>
                                    <input 
                                    type="text" 
                                    value={formData.staffId}
                                    onChange={(e) => updateField('staffId', e.target.value)}
                                    placeholder="Student / Staff ID Number *" 
                                    className="p-3 border rounded-lg" 
                                    
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
                                    <label htmlFor="department" required >Department / Programme</label>
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
                                    <label htmlFor="orcid" required >ORCID / LinkedIn / Portfolio (if any)</label>
                                    <input 
                                    type="text" 
                                    value={formData.orcid}
                                    onChange={(e) => updateField('orcid', e.target.value)}
                                    placeholder="" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Have you previously received a Daystar Innovation Grant?</label>
                                    <select 
                                        value={formData.hasActiveGrant}
                                        onChange={(e) => updateField('hasActiveGrant', e.target.value)}
                                        className="w-full p-2 rounded border" 
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">If yes, mention the Grant Name & Year</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Grant Name & Year" 
                                        className="p-3 border rounded-lg" 
                                    />
                                </div>
                                
                            </div>
                        </div>
                    )}
                        {/* innovation team composition */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            {/* <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 2: Innovation Team</h3> */}
                            <TeamSection 
                                data={formData.team} 
                                onTeamChange={(newTeam) => updateField(2, 'team', newTeam)} 
                                isInnovation={true} 
                            />
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required >Primary Faculty Mentor / Supervisor </label>
                                <input
                                        type="text" 
                                        value={formData.facultyMentor}
                                        onChange={(e) => updateField('facultyMentor', e.target.value)}
                                        placeholder=" Name, title, department, and email of faculty mentor" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required >Describe how the team's combined expertise supports this innovation </label>
                                <textarea
                                        type="text" 
                                        value={formData.school}
                                        onChange={(e) => updateField('school', e.target.value)}
                                        placeholder=" Explain the relevant skills, experience, and roles that each member brings to the project." 
                                        className="p-3 border rounded-lg" 
                                        required 
                                />
                            </div>
                        </div>
                    )}
                    {/* innovation overview section */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 3: Innovation Overview</h3>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required >Title of Innovation/ Product/ Service </label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => updateField(3, 'title', e.target.value)}
                                    placeholder=" Clear and concise — maximum 15 words" 
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Current Innovation Stage</label>
                                <select 
                                value={formData.stage}
                                onChange={(e) => updateField(3, 'stage', e.target.value)}
                                className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4"
                                >
                                    <option value=""> Select...</option>
                                    <option>Proof of concept</option>
                                    <option>Prototype / MVP</option>
                                    <option>Pilot / Testing</option>
                                    <option>Early market / Scaling</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required >Sector / Industry</label>
                                <input 
                                    type="text" 
                                    value={formData.sector}
                                    onChange={(e) => updateField(3, 'sector', e.target.value)}
                                    placeholder=" Enter your answer" 
                                    className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required >Brief description of the innovation</label>
                                <textarea 
                                    value={formData.problem}
                                    onChange={(e) => updateField(3, 'problem', e.target.value)}
                                    placeholder=" What is the innovation, product, or service? What does it do and how does it work?" 
                                    className="w-full p-4 border-2 border-slate-100 rounded-xl h-32"
                            ></textarea>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="" required > What makes this innovation unique? (Value proposition / competitive advantage)</label>
                                <textarea 
                                    value={formData.problem}
                                    onChange={(e) => updateField(3, 'problem', e.target.value)}
                                    placeholder=" How is this different from or better than existing solutions?" 
                                    className="w-full p-4 border-2 border-slate-100 rounded-xl h-32"
                                 ></textarea>
                            </div>
                             
                            
                            
                            
                        </div>
                    )}
                    {step === 4 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 4: Research and Evidence Base</h3>
                            
                            <div className='flex flex-col gap-2'>
                                
                                <label htmlFor="" required className="block text-sm font-semibold" >Is the innovation based on a specific research project?</label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Yes</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>No - explain how the innovation is evidence based</span>
                                </label>
                                
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">If no, briefly explain the evidence/research basis:</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Enter your answer" 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Research Paper details (if applicable)</label>
                                    <input 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder=" Title | Authors | Journal / Conference | Status (published / submitted / in pipeline) | Expected submission date" 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> Summary of key research findings that underpin this innovation</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder=" Briefly describe how the research evidence supports the innovation and its commercialization potential." 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                        </div>
                    )}
                    {/* commercialization section 5 */}
                    {step === 5 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Commercialization Plan</h3>
                            
                            <div className='flex flex-col gap-2'>
                                
                                <label htmlFor="" required className="block text-sm font-semibold" >Revenue Model</label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Product Sales</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Subscription / SaaS</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Licensing / Royalties</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Service fees</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Freemium</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="Other" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    
                                </label>
                                
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="firstName">Market Size & Opportunity</label>
                                <textarea
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder=" Describe the total addressable market, target market size, and growth potential. Include data or estimates where possible." 
                                        className="p-3 border rounded-lg" 
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Current traction and validation evidence</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Describe any existing customers, users, pilots, letters of intent, partnerships, sales, or other validation achieved so far." 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Commercialization strategy and planned activities</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Describe your go-to-market approach, key milestones for product launch, and scale-up strategy." 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Competitive landscape</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder=" Who are your main competitors? How does your solution compare and what is your sustainable competitive advantage?" 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> Strategic partnerships and stakeholder engagement</label>
                                    <textarea 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder=" Identify any existing or planned partnerships with industry, government, NGOs, or other universities." 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                        </div>
                    )}
                        {/* section 6 starts here */}

                    {step === 6 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Section 6: Funding Requirements</h3>
                            <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> Amount Requested (Ksh)</label>
                                    <input 
                                        type="text" 
                                        value={formData.test}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                        placeholder="Enter the amount requested in Ksh." 
                                        className="p-3 border rounded-lg" 
                                    />
                            </div>
                            <BudgetTable 
                                budget={formData.budget || []} 
                                onBudgetChange={(newBudget) => updateField(6, 'budget', newBudget)} 
                                isInnovation={true} 
                                max={1000000} 
                            />
                            <label htmlFor="staffId" required >Have you received or applied for other funding for this innovation?</label>
                            <label htmlFor="" className='flex gap-2'>
                                <input 
                                    type="radio" 
                                    value={formData.piSignature}
                                    onChange={(e) => updateField('piSignature', e.target.value)}
                                    placeholder="PI Full Name (Signature) *" 
                                    className="p-3 border rounded-lg" 
                                    required 
                                />
                                <span>Yes</span>
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
                                <span>No</span>
                            </label>
                            <label htmlFor="" className='flex gap-2'>If yes, specify funder, amount and status</label>
                                <input 
                                    type="text" 
                                    value={formData.piSignature}
                                    onChange={(e) => updateField('piSignature', e.target.value)}
                                    placeholder="Enter your answer..." 
                                    className="w-full p-3 border rounded-lg" 
                                    required 
                                />
                                
                        
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Intellectual Property and Equity Arrangements</h3>
                            <p className='text-xs'> Successful applicants may be required to enter into an IP co-ownership and/or equity arrangement with Daystar University, subject to negotiation and University policy.</p>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="phone" className='text-sm font-semibold mb-2' required >Current IP Status of the innovation</label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>No IP protection yet</span>
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
                                    <span>Patent Pending</span>
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
                                    <span>Patent granted</span>
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
                                    <span>Trademark</span>
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
                                    <span>Copyright</span>
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
                                    <span>Trade Secret</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="text" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="Other..." 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    
                                </label>
                                
                            </div>
                            <label htmlFor="phone" className='text-sm font-semibold mb-2' required > Are you willing to accept joint IP registration with Daystar University? </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Yes</span>
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
                                    <span>No- Explain</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Open to discussion</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>Explain if No</label>
                                    <input 
                                        type="text" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="Please explain..." 
                                        className="w-full p-3 border rounded-lg" 
                                        required 
                                    />
                                <br />
                                <label htmlFor="phone" className='text-sm font-semibold mb-2' required >Are you willing to enter into a negotiated equity arrangement with Daystar University?</label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="PI Full Name (Signature) *" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Yes</span>
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
                                    <span>No- Explain</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="radio" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="" 
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>Open to discussion</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>Explain if No</label>
                                    <input 
                                        type="text" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder="Please explain..." 
                                        className="w-full p-3 border rounded-lg" 
                                        required 
                                    />

                                <label htmlFor="" className='flex gap-2'> Describe the current ownership structure of this innovation</label>
                                    <input 
                                        type="text" 
                                        value={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.value)}
                                        placeholder=" Who currently owns or co-owns this innovation? Are there any existing equity arrangements or investor agreements in place?" 
                                        className="w-full p-3 border rounded-lg" 
                                        required 
                                    />
                                    
                                
                        </div>
                    )}
                    {/* implementation section */}
                    {step === 8 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Implementation Plan</h3>
                            <div className="space-y-4">
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" required >What specific activities will this funding support? </label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => updateField(3, 'title', e.target.value)}
                                        placeholder="List the key activities you plan to undertake with this funding, including product refinement, testing, regulatory processes, market entry, etc." 
                                        className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                                    />
                                </div>
                                
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" required >Expected outcomes and success metrics</label>
                                    <textarea
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => updateField(3, 'title', e.target.value)}
                                        placeholder=" What will success look like? How will you measure it? Include quantitative targets where possible (e.g. number of users, revenue, units sold, regulatory approval obtained)." 
                                        className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" required > Risks and mitigation strategies</label>
                                    <input 
                                        type="text" 
                                        value={formData.title}
                                        onChange={(e) => updateField(3, 'title', e.target.value)}
                                        placeholder=" Identify the main risks to achieving your goals and how you plan to address them." 
                                        className="w-full p-3 border-2 border-slate-100 rounded-xl mb-4" 
                                    />
                                </div>
                                
                                
                               
                            </div>
                        </div>
                    )}
                    {step === 9 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-daystar-blue">Evaluation Criteria Reference</h3>
                            <p className='text-xs'> Concept notes will be evaluated against the following criteria. Use this as a self-assessment guide before submitting.</p>
                            <img src="./criteria.png" alt="" />
                        </div>
                    )}

                    {step === 10 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2">I hereby confirm and declare that:</h3>
                            <p className='text-xs'>Please select 9 options.</p>
                            <div className="space-y-4">
                                
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I meet the eligibility criteria for this call and all information provided in this application is accurate and complete.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I have a working MVP or clearly advanced innovation with demonstrated commercialization potential.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I am willing, where applicable, to enter into a negotiated equity arrangement with Daystar University</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I am willing, where applicable, to accept joint Intellectual Property (IP) registration with Daystar University in accordance with University policy.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I agree to adhere to all Daystar University policies and guidelines governing research, innovation, commercialization, IP, and project management.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I understand that if shortlisted, I will be required to pitch before a selection panel.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I understand that multiple or duplicate applications will not be evaluated.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I consent to Daystar University collecting and processing information in this application for grant evaluation and administration purposes.</span>
                                </label>
                                <label htmlFor="" className='flex gap-2'>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.piSignature}
                                        onChange={(e) => updateField('piSignature', e.target.checked)}
                                        className="p-3 border rounded-lg" 
                                        required 
                                    />
                                    <span>I acknowledge that only successful applicants after the pitching stage will be contacted.</span>
                                </label>
                                <br />
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName">Lead Applicant Full Name (As Signature)</label>
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
                                        <label htmlFor="firstName">Faculty Mentor Name & Signature (if applicable)</label>
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
                                        <label htmlFor="firstName">Date</label>
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

                    {/* Uploads section */}
                    {step === 11 && (
                        <div className="space-y-6 animate-in fade-in">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-[1e293b]">10. Attachments Checklist</h3>
                            
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> CV / Resume of lead applicant</label>
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
                                    <label htmlFor="firstName">CVs of key team members</label>
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                           
                                    />
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            
                                    />
                                    <input 
                                            type="file" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                           
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> Photos or screenshots of the MVP / prototype</label>
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
                                    <label htmlFor="firstName"> Research paper(s) linked to the innovation (published, submitted, or draft)</label>
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
                                    <label htmlFor="firstName"> Demo video or product demonstration link (URL) (Recommended)</label>
                                    <input 
                                            type="url" 
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            placeholder=" " 
                                            className="p-3 border rounded-lg" 
                                            required 
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstName"> Letters of intent or support from potential customers / partners</label>
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
                                    <label htmlFor="firstName"> Market research or validation data</label>
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
                                    <label htmlFor="firstName"> Existing IP registration documents (patent, trademark, etc.)</label>
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
                                    <label htmlFor="firstName"> Any other supporting documents</label>
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
                               
                            <div className="p-4 bg-blue-50 text-[01aaee] rounded-lg text-sm">
                                All completed applications are submitted to: <strong>drice@daystar.ac.ke</strong>
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