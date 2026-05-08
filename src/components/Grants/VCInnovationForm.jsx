import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { ShieldCheck } from "lucide-react";
import FormHeader from "./Shared/FormHeader";
import ApplicantSection from "./VCInnovation/ApplicantSection";
import TeamCompositionSection from "./VCInnovation/TeamCompositionSection";
import InnovationSection from "./VCInnovation/InnovationSection";
import ResearchSection from "./VCInnovation/ResearchSection";
import CommercializationSection from "./VCInnovation/CommercializationSection";
import FundingSection from "./VCInnovation/FundingSection";
import IPSection from "./VCInnovation/IPSection";
import ImplementationSection from "./VCInnovation/ImplementationSection";
import EvaluationSection from "./VCInnovation/EvaluationSection";
import DeclarationSection from "./VCInnovation/DeclarationSection";
import AttachmentsSection from "./VCInnovation/AttachmentsSection";
import { submitVcInnovationApplication, ApiError } from "../../api/grants";
import { uploadFile } from "../../api/storage";

const TOTAL_STEPS = 11;

const SECTION_LABELS = [
  "Applicant Information",
  "Innovation Team",
  "Innovation Overview",
  "Research & Evidence",
  "Commercialization Plan",
  "Funding Requirements",
  "IP & Equity",
  "Implementation Plan",
  "Evaluation Criteria",
  "Declaration",
  "Attachments",
];

const ATTACHMENT_FIELDS = [
  { fileKey: "cvFile", payloadKey: "cvUrl", folder: "vc-innovation/cv" },
  {
    fileKey: "mvpPhotosFile",
    payloadKey: "mvpPhotosUrl",
    folder: "vc-innovation/mvp-photos",
  },
  {
    fileKey: "demoVideoFile",
    payloadKey: "demoVideoUrl",
    folder: "vc-innovation/demo-video",
  },
  {
    fileKey: "researchPapersFile",
    payloadKey: "researchPapersUrl",
    folder: "vc-innovation/research-papers",
  },
  {
    fileKey: "lettersOfIntentFile",
    payloadKey: "lettersOfIntentUrl",
    folder: "vc-innovation/letters-of-intent",
  },
  {
    fileKey: "marketResearchFile",
    payloadKey: "marketResearchUrl",
    folder: "vc-innovation/market-research",
  },
  {
    fileKey: "ipDocumentsFile",
    payloadKey: "ipDocumentsUrl",
    folder: "vc-innovation/ip-documents",
  },
  {
    fileKey: "otherDocumentsFile",
    payloadKey: "otherDocumentsUrl",
    folder: "vc-innovation/other",
  },
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
        payload[field.payloadKey] = uploaded
          .map((item) => item.publicUrl)
          .join(",");
      }
    } else if (raw instanceof File) {
      const uploaded = await uploadFile({ file: raw, folder: field.folder });
      payload[field.payloadKey] = uploaded.publicUrl;
    }

    delete payload[field.fileKey];
  }

  return payload;
}

const VCInnovationForm = ({ onBack }) => {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("vcInnovationFormStep");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: (() => {
      const savedData = localStorage.getItem("vcInnovationFormData");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          parsed.cvFile = null;
          parsed.mvpPhotosFile = null;
          parsed.demoVideoFile = null;
          parsed.researchPapersFile = null;
          parsed.lettersOfIntentFile = null;
          parsed.marketResearchFile = null;
          parsed.ipDocumentsFile = null;
          parsed.otherDocumentsFile = [];
          return parsed;
        } catch (e) {}
      }
      return {
        // Section 1
        firstName: "",
        lastName: "",
        studentLevel: "",
        category: "",
        staffId: "",
        school: "",
        department: "",
        email: "",
        phone: "",
        orcid: "",
        hasActiveGrant: "",
        prevGrantDetails: "",
        // Section 2
        team: [{ name: "", role: "", studentId: "", email: "" }],
        facultyMentor: "",
        teamExpertise: "",
        // Section 3
        innovationTitle: "",
        innovationStage: "",
        sector: "",
        innovationDescription: "",
        valueProp: "",
        // Section 4
        isResearchBased: "",
        evidenceBasis: "",
        researchPaperDetails: "",
        researchSummary: "",
        // Section 5
        revenueModel: "",
        marketSize: "",
        traction: "",
        commercializationStrategy: "",
        competition: "",
        partnerships: "",
        // Section 6
        requestedAmount: "",
        budgetItems: [],
        otherFunding: "",
        otherFundingDetails: "",
        // Section 7
        ipStatus: "",
        ipStatusOther: "",
        jointIPConsent: "",
        jointIPExplanation: "",
        equityConsent: "",
        equityExplanation: "",
        ownershipStructure: "",
        // Section 8
        fundingActivities: "",
        successMetrics: "",
        risks: "",
        // Section 10
        declarationAccepted: false,
        applicantSignatureName: "",
        declarationDate: "",
        mentorSignatureName: "",
        mentorSignatureDate: "",
        // Section 11
        cvFile: null,
        mvpPhotosFile: null,
        demoVideoFile: null,
        researchPapersFile: null,
        lettersOfIntentFile: null,
        marketResearchFile: null,
        ipDocumentsFile: null,
        otherDocumentsFile: [],
      };
    })(),

    onSubmit: async ({ value }) => {
      setSubmitError(null);
      setIsSubmitting(true);
      try {
        const payload = await buildSubmissionPayload(value);
        const result = await submitVcInnovationApplication(payload);
        if (!result.success) {
          const msg = result.errors
            ? result.errors.map((e) => e.message).join(", ")
            : (result.message ?? "Submission failed. Please try again.");
          setSubmitError(msg);
        } else {
          localStorage.removeItem("vcInnovationFormData");
          localStorage.removeItem("vcInnovationFormStep");
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Submission error:", error);
        let msg = "Network error. Please check your connection and try again.";

        if (error instanceof ApiError) {
          if (error.errors && error.errors.length > 0) {
            msg = error.errors.map((e) => e.message || e).join(", ");
          } else {
            msg = error.message;
          }
        } else if (error instanceof Error) {
          msg = error.message;
        }

        setSubmitError(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const isLastStep = step === TOTAL_STEPS;

  useEffect(() => {
    const saveState = () => {
      const vals = { ...form.state.values };
      vals.cvFile = null;
      vals.mvpPhotosFile = null;
      vals.demoVideoFile = null;
      vals.researchPapersFile = null;
      vals.lettersOfIntentFile = null;
      vals.marketResearchFile = null;
      vals.ipDocumentsFile = null;
      vals.otherDocumentsFile = [];
      localStorage.setItem("vcInnovationFormData", JSON.stringify(vals));
      localStorage.setItem("vcInnovationFormStep", step.toString());
    };
    saveState();
    window.addEventListener("beforeunload", saveState);
    return () => window.removeEventListener("beforeunload", saveState);
  }, [step]);

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto py-20 px-4 min-h-screen bg-slate-50/50 flex flex-col items-center justify-center">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-100 p-12 text-center space-y-8 w-full max-w-2xl animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Application Submitted!
            </h2>
            <p className="text-slate-500 max-w-md mx-auto text-xl leading-relaxed">
              Your concept note for the VC Innovation Grant has been received. You
              will be contacted if shortlisted for the pitching stage.
            </p>
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-daystar-blue hover:bg-daystar-blue/90 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
            >
              Return to Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <FormHeader
        title="VC'S RESEARCH, INNOVATION & COMMERCIALIZATION GRANT"
        subtitle="2025/2026 Concept Note Application"
        deadline="20th May 2026 | 5:00 PM EAT"
      />

      {/* Enhanced Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Section {step} of {TOTAL_STEPS} — {SECTION_LABELS[step - 1]}
          </span>
          <span className="text-sm font-bold text-daystar-blue flex flex-col items-end">
            <span>{Math.round((step / TOTAL_STEPS) * 100)}% Completed</span>
            <span className="text-xs text-slate-400 font-normal">
              Up to 10 successful applicants supported
            </span>
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-daystar-blue h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-100">
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
              className="text-slate-500 font-bold hover:text-daystar-blue hover:bg-blue-50 px-6 py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {step === 1 ? "Exit Form" : "Go Back"}
            </button>

            <button
              type="button"
              onClick={isLastStep ? () => form.handleSubmit() : nextStep}
              disabled={isSubmitting}
              className="bg-daystar-blue text-white px-12 py-4 rounded-xl font-bold shadow-sm hover:scale-[1.02] hover:shadow-md transition-all disabled:opacity-50 flex items-center gap-2 border border-blue-600"
            >
              {isSubmitting
                ? "Submitting..."
                : isLastStep
                  ? "Submit Concept Note"
                  : "Next Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VCInnovationForm;
