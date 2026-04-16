import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { ShieldCheck } from 'lucide-react';
import FormHeader from './Shared/FormHeader';
import ApplicantSection from './VCInnovation/ApplicantSection';
import TeamCompositionSection from './VCInnovation/TeamCompositionSection';
import InnovationSection from './VCInnovation/InnovationSection';
import ResearchSection from './VCInnovation/ResearchSection';
import CommercializationSection from './VCInnovation/CommercializationSection';
import FundingSection from './VCInnovation/FundingSection';
import IPSection from './VCInnovation/IPSection';
import ImplementationSection from './VCInnovation/ImplementationSection';
import EvaluationSection from './VCInnovation/EvaluationSection';
import DeclarationSection from './VCInnovation/DeclarationSection';
import AttachmentsSection from './VCInnovation/AttachmentsSection';
import { submitVcInnovationApplication } from '../../api/grants';
import { uploadFile } from '../../api/storage';

const TOTAL_STEPS = 11;

const SECTION_LABELS = [
  'Applicant Information',
  'Innovation Team',
  'Innovation Overview',
  'Research & Evidence',
  'Commercialization Plan',
  'Funding Requirements',
  'IP & Equity',
  'Implementation Plan',
  'Evaluation Criteria',
  'Declaration',
  'Attachments',
];

const ATTACHMENT_FIELDS = [
  { fileKey: 'cvFile', payloadKey: 'cvUrl', folder: 'vc-innovation/cv' },
  { fileKey: 'mvpPhotosFile', payloadKey: 'mvpPhotosUrl', folder: 'vc-innovation/mvp-photos' },
  { fileKey: 'demoVideoFile', payloadKey: 'demoVideoUrl', folder: 'vc-innovation/demo-video' },
  { fileKey: 'researchPapersFile', payloadKey: 'researchPapersUrl', folder: 'vc-innovation/research-papers' },
  { fileKey: 'lettersOfIntentFile', payloadKey: 'lettersOfIntentUrl', folder: 'vc-innovation/letters-of-intent' },
  { fileKey: 'marketResearchFile', payloadKey: 'marketResearchUrl', folder: 'vc-innovation/market-research' },
  { fileKey: 'ipDocumentsFile', payloadKey: 'ipDocumentsUrl', folder: 'vc-innovation/ip-documents' },
  { fileKey: 'otherDocumentsFile', payloadKey: 'otherDocumentsUrl', folder: 'vc-innovation/other' },
];

async function buildSubmissionPayload(value) {
  const payload = { ...value };

  for (const field of ATTACHMENT_FIELDS) {
    const raw = value[field.fileKey];

    if (Array.isArray(raw)) {
      if (raw.length > 0) {
        const uploaded = await Promise.all(
          raw.map((file) => uploadFile({ file, folder: field.folder })),
        );
        payload[field.payloadKey] = uploaded.map((item) => item.referenceId).join(',');
      }
    } else if (raw instanceof File) {
      const uploaded = await uploadFile({ file: raw, folder: field.folder });
      payload[field.payloadKey] = uploaded.referenceId;
    }

    delete payload[field.fileKey];
  }

  return payload;
}

const VCInnovationForm = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      // Section 1
      firstName: '', lastName: '', studentLevel: '', category: '',
      staffId: '', school: '', department: '', email: '', phone: '',
      orcid: '', hasActiveGrant: '', prevGrantDetails: '',
      // Section 2
      team: [{ name: '', role: '', studentId: '', email: '' }],
      facultyMentor: '', teamExpertise: '',
      // Section 3
      innovationTitle: '', innovationStage: '', sector: '',
      innovationDescription: '', valueProp: '',
      // Section 4
      isResearchBased: '', evidenceBasis: '', researchPaperDetails: '', researchSummary: '',
      // Section 5
      revenueModel: '', marketSize: '', traction: '',
      commercializationStrategy: '', competition: '', partnerships: '',
      // Section 6
      requestedAmount: 0, budgetItems: [], otherFunding: '', otherFundingDetails: '',
      // Section 7
      ipStatus: '', ipStatusOther: '', jointIPConsent: '', jointIPExplanation: '',
      equityConsent: '', equityExplanation: '', ownershipStructure: '',
      // Section 8
      fundingActivities: '', successMetrics: '', risks: '',
      // Section 10
      declarationAccepted: false,
      applicantSignatureName: '', declarationDate: '',
      mentorSignatureName: '', mentorSignatureDate: '',
      // Section 11
      cvFile: null, mvpPhotosFile: null, demoVideoFile: null,
      researchPapersFile: null, lettersOfIntentFile: null,
      marketResearchFile: null, ipDocumentsFile: null, otherDocumentsFile: [],
    },

    onSubmit: async ({ value }) => {
      setSubmitError(null);
      setIsSubmitting(true);
      try {
        const payload = await buildSubmissionPayload(value);
        const result = await submitVcInnovationApplication(payload);
        if (!result.success) {
          const msg = result.errors
            ? result.errors.map((e) => e.message).join(', ')
            : result.message ?? 'Submission failed. Please try again.';
          setSubmitError(msg);
        } else {
          setSubmitted(true);
        }
      } catch (error) {
        setSubmitError(error?.message ?? 'Network error. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const isLastStep = step === TOTAL_STEPS;

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto pb-20 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-16 text-center space-y-4 border border-blue-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application Submitted!</h2>
          <p className="text-slate-500">
            Your concept note for the VC Innovation Grant has been received. You will be
            contacted if shortlisted for the pitching stage.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="bg-daystar-blue text-white px-8 py-3 rounded-xl font-bold"
          >
            Return to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <FormHeader
        title="VC'S RESEARCH, INNOVATION & COMMERCIALIZATION GRANT"
        subtitle="2025/2026 Concept Note Application"
        deadline="10 May 2026 | 5:00 PM EAT"
      />

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
        {/* Step indicator */}
        <div className="bg-daystar-blue px-8 py-3 text-white flex justify-between items-center">
          <span className="font-medium">
            Section {step} of {TOTAL_STEPS} — {SECTION_LABELS[step - 1]}
          </span>
          <div className="text-xs opacity-80 italic">Up to 10 successful applicants supported</div>
        </div>

        <form
          className="p-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {step === 1 && <ApplicantSection form={form} />}
          {step === 2 && <TeamCompositionSection form={form} />}
          {step === 3 && <InnovationSection form={form} />}
          {step === 4 && <ResearchSection form={form} />}
          {step === 5 && <CommercializationSection form={form} />}
          {step === 6 && <FundingSection form={form} />}
          {step === 7 && <IPSection form={form} />}
          {step === 8 && <ImplementationSection form={form} />}
          {step === 9 && <EvaluationSection />}
          {step === 10 && <DeclarationSection form={form} />}
          {step === 11 && <AttachmentsSection form={form} />}

          {submitError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mt-6 font-medium">
              {submitError}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <button
              type="button"
              onClick={step === 1 ? onBack : prevStep}
              disabled={isSubmitting}
              className="text-slate-400 font-bold hover:text-daystar-blue transition-colors disabled:opacity-50"
            >
              {step === 1 ? 'Exit Form' : 'Go Back'}
            </button>

            <button
              type="button"
              onClick={isLastStep ? () => form.handleSubmit() : nextStep}
              disabled={isSubmitting}
              className="bg-daystar-blue text-white px-12 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-daystar-dark transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit Concept Note' : 'Next Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VCInnovationForm;
