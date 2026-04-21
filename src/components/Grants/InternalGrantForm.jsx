import React, { useState, useEffect } from "react";
import { ClipboardCheck } from "lucide-react";
import { submitInternalGrantApplication, sendInternalGrantConfirmation, ApiError } from "../../api/grants";
import { uploadFile } from "../../api/storage";
import TeamSection from "./Shared/TeamSection";
import BudgetTable from "./Shared/BudgetTable";
import FormHeader from "./Shared/FormHeader";
import FileUploadField from "./Shared/FileUploadField";

// Map between form attachment fields and backend URL fields
const ATTACHMENT_FIELDS = [
  {
    fileKey: "proposal",
    payloadKey: "proposalUrl",
    folder: "internal-grant/proposal",
  },
  { fileKey: "piCv", payloadKey: "piCvUrl", folder: "internal-grant/pi-cv" },
  {
    fileKey: "coIvCv",
    payloadKey: "coIvCvUrl",
    folder: "internal-grant/co-investigator-cv",
  },
  {
    fileKey: "raCv",
    payloadKey: "studentCvUrl",
    folder: "internal-grant/ra-cv",
  },
  {
    fileKey: "ethics",
    payloadKey: "ethicsUrl",
    folder: "internal-grant/ethics",
  },
  { fileKey: "gantt", payloadKey: "ganttUrl", folder: "internal-grant/gantt" },
];

const InternalGrantForm = ({ onBack }) => {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("internalGrantFormStep");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("internalGrantFormData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Always ensure attachments is initialized correctly as it's not persisted
        parsed.attachments = {
          proposal: null,
          piCv: null,
          coIvCv: null,
          raCv: null,
          ethics: null,
          gantt: null,
          support: null,
          other: [],
        };
        return parsed;
      } catch (e) {}
    }
    return {
      // Section 1: Eligibility
      isFullTime: "",
      academicRank: "",
      otherRank: "",
      hasActiveGrant: "",
      // Section 2: PI Details
      firstName: "",
      lastName: "",
      staffId: "",
      email: "",
      phone: "",
      orcid: "",
      school: "",
      department: "",
      researchArea: "",
      previousGrants: "",
      // Section 3: Co-Investigators
      team: [{ name: "", institution: "", role: "", email: "" }],
      // Section 4: Project Overview
      projectTitle: "",
      primaryTheme: "",
      otherTheme: "",
      projectApproach: "",
      // Section 5: Technical Proposal (Briefs)
      abstract: "",
      problemStatement: "",
      objectives: "",
      methodology: "",
      significance: "",
      // Section 6: Work Plan
      durationMonths: "12",
      ganttStatus: "",
      milestones: "",
      monitoringPlan: "",
      // Section 7: Budget
      budget: [{ item: "", category: "", amount: "", justification: "" }],
      totalAmount: 0,
      // Section 8: Ethical Considerations
      requiresEthics: "",
      ethicsStatus: "",
      // Section 9: Declaration
      piSignature: "",
      date: "",
      hodName: "",
      hodEmail: "",
      // Section 10: Checklist
      checklist: {
        form: true,
        proposal: false,
        piCv: false,
        coIvCv: false,
        ethics: false,
        gantt: false,
      },
      // Section 11: Actual Files
      attachments: {
        proposal: null,
        piCv: null,
        coIvCv: null,
        raCv: null,
        ethics: null,
        gantt: null,
        support: null,
        other: [],
      },
    };
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const dataToSave = { ...formData, attachments: null };
    localStorage.setItem("internalGrantFormData", JSON.stringify(dataToSave));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("internalGrantFormStep", step.toString());
  }, [step]);

  // Safety check to ensure attachments is never null in state
  useEffect(() => {
    if (formData && !formData.attachments) {
      setFormData((prev) => ({
        ...prev,
        attachments: {
          proposal: null,
          piCv: null,
          coIvCv: null,
          raCv: null,
          ethics: null,
          gantt: null,
          support: null,
          other: [],
        },
      }));
    }
  }, [formData?.attachments]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      // Step 1: Upload all files to Supabase and collect reference IDs
      const payload = { ...formData };

      for (const field of ATTACHMENT_FIELDS) {
        const raw = formData.attachments?.[field.fileKey];

        if (raw instanceof File) {
          const uploaded = await uploadFile({
            file: raw,
            folder: field.folder,
          });
          payload[field.payloadKey] = uploaded.publicUrl;
        }
      }

      // Step 2: Normalize payload for backend
      const normalizedPayload = {
        ...payload,
        // Backend expects piDeclarationDate, but UI currently stores this as `date`.
        piDeclarationDate: formData.date,
        // Ensure PI signature is sent even if previously typed in the old declaration binding.
        piSignature:
          formData.piSignature ||
          `${formData.firstName} ${formData.lastName}`.trim(),
        // Backend expects milestones; fall back to work-plan text if explicit milestones are empty.
        milestones:
          (formData.milestones || "").trim() ||
          (formData.monitoringPlan || "").trim() ||
          (formData.workPlanTimeline || "").trim(),
        budget: (formData.budget || []).map((item) => ({
          ...item,
          // Backend requires `item`; use category as fallback when user leaves description blank.
          item: (item.item || "").trim() || item.category || "Budget item",
          amount: Number(item.amount) || 0,
        })),
      };

      delete normalizedPayload.date;
      delete normalizedPayload.monitoringPlan;
      delete normalizedPayload.attachments;

      // Step 3: Create FormData and submit (no files this time, just reference IDs)
      const formDataToSend = new FormData();
      formDataToSend.append(
        "applicantName",
        `${formData.firstName} ${formData.lastName}`,
      );
      formDataToSend.append("formName", "Internal Research Grant");
      formDataToSend.append("data", JSON.stringify(normalizedPayload));

      const result = await submitInternalGrantApplication(formDataToSend);

      if (!result.success || !result.data?.id) {
        throw new Error(result.message || "Failed to save application data.");
      }

      const applicantId = result.data.id;
      console.log("Step 1 Successful — Application ID:", applicantId);

      // Step 4: Trigger confirmation emails (Step 2 in API)
      const confirmResult = await sendInternalGrantConfirmation(applicantId, normalizedPayload);

      if (!confirmResult.success) {
        throw new Error(confirmResult.message || "Application saved, but failed to send confirmation emails.");
      }

      console.log("Step 2 Successful — Emails sent:", confirmResult);

      localStorage.removeItem("internalGrantFormData");
      localStorage.removeItem("internalGrantFormStep");
      setStatus({ submitting: false, success: true, error: null });
    } catch (err) {
      console.error("Submission error:", err);
      
      let errorMessage = "Submission failed. Please try again.";
      
      if (err instanceof ApiError) {
        if (err.errors && err.errors.length > 0) {
          errorMessage = err.errors.map(e => e.message || e).join(", ");
        } else {
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setStatus({
        submitting: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 min-h-screen bg-slate-50/50">
      <FormHeader
        title="2025/2026 INTERNAL RESEARCH GRANT"
        subtitle="Full Application Form - Directorate of Research, Innovation, Commercialization & Entrepreneurship"
        deadline="10 May 2026"
      />

      {/* Enhanced Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Section {step} of 10
          </span>
          <span className="text-sm font-bold text-daystar-blue">
            {Math.round((step / 10) * 100)}% Completed
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-daystar-blue h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-100">
        {/* collecting form responses starts here */}
        <form className="p-8">
          {/* eligibility  */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                1. Eligibility Confirmation
              </h3>
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-blue-50/30 rounded-xl border border-blue-100/50">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    1.1 Full-time staff member? *
                  </label>
                  <select
                    value={formData.isFullTime ?? ''}
                    onChange={(e) => updateField("isFullTime", e.target.value)}
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    1.2 Current academic rank? *
                  </label>
                  <select
                    value={formData.academicRank ?? ''}
                    onChange={(e) =>
                      updateField("academicRank", e.target.value)
                    }
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="lect">Lecturer</option>
                    <option value="senior_lecturer">Senior Lecturer</option>
                    <option value="associate_professor">
                      Associate Professor
                    </option>
                    <option value="professor">Professor</option>
                    <option value="other">Other </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    1.2 Active internal grant? *
                  </label>
                  <select
                    value={formData.hasActiveGrant ?? ''}
                    onChange={(e) =>
                      updateField("hasActiveGrant", e.target.value)
                    }
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
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
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                2. Principal Investigator Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName ?? ''}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="First Name *"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName ?? ''}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Last Name *"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="staffId" required>
                    Staff ID
                  </label>
                  <input
                    type="text"
                    value={formData.staffId ?? ''}
                    onChange={(e) => updateField("staffId", e.target.value)}
                    placeholder="Staff ID (DU-XXXX) *"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" required>
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    value={formData.email ?? ''}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="name@daystar.ac.ke"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" required>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone ?? ''}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Phone (+254...) "
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="orcid" required>
                    ORCID / ResearchGate ID (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.orcid ?? ''}
                    onChange={(e) => updateField("orcid", e.target.value)}
                    placeholder=""
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="school" required>
                    School/ Faculty
                  </label>
                  <input
                    type="text"
                    value={formData.school ?? ''}
                    onChange={(e) => updateField("school", e.target.value)}
                    placeholder=""
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="department" required>
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department ?? ''}
                    onChange={(e) => updateField("department", e.target.value)}
                    placeholder="Department *"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="researchArea" required>
                    Research area / area of specialization
                  </label>
                  <textarea
                    type="text"
                    value={formData.researchArea ?? ''}
                    onChange={(e) =>
                      updateField("researchArea", e.target.value)
                    }
                    placeholder=""
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="previousGrants" required>
                    Previous research grants (last 5 years)
                  </label>
                  <textarea
                    type="text"
                    value={formData.previousGrants ?? ''}
                    onChange={(e) =>
                      updateField("previousGrants", e.target.value)
                    }
                    placeholder="List any externally or internally funded projects: (Include Grant Name | Funder | Year | Amount | Status"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {/* Matters team composition */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              {/* <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">3. Research Team Composition</h3> */}
              <TeamSection
                data={formData.team}
                onChange={(team) => updateField("team", team)}
                isInnovation={false}
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="teamRoleDescription" required>
                  Describe the role of each team member and the expertise they
                  are bringing to the project
                </label>
                <textarea
                  type="text"
                  value={formData.teamRoleDescription || ""}
                  onChange={(e) =>
                    updateField("teamRoleDescription", e.target.value)
                  }
                  placeholder="Explain how each member contributes to the project and what expertise they bring."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mentorshipPlan" required>
                  Mentorship plan for early-career researchers and/or
                  postgraduate students
                </label>
                <textarea
                  type="text"
                  value={formData.mentorshipPlan || ""}
                  onChange={(e) =>
                    updateField("mentorshipPlan", e.target.value)
                  }
                  placeholder=" Describe how junior team members will be mentored and developed through this project"
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                4. Project Overview
              </h3>

              <div className="flex flex-col gap-2">
                <label htmlFor="projectTitle" required>
                  4.1 Project Title
                </label>
                <textarea
                  type="text"
                  value={formData.projectTitle ?? ''}
                  onChange={(e) => updateField("projectTitle", e.target.value)}
                  placeholder="Clear and descriptive"
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="staffId" required>
                  4.2 Primary Thematic Area
                </label>
                <select
                  value={formData.primaryTheme ?? ''}
                  onChange={(e) => updateField("primaryTheme", e.target.value)}
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
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
              <div className="flex flex-col gap-2">
                <label htmlFor="secondaryTheme" required>
                  4.3 Secondary Thematic Area (If Applicable){" "}
                </label>
                <textarea
                  type="text"
                  value={formData.otherTheme || ""}
                  onChange={(e) => updateField("otherTheme", e.target.value)}
                  placeholder=""
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="staffId" required>
                  4.4 Research Approach
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Qualitative"
                    checked={formData.projectApproach === "Qualitative"}
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Qualitative</span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Quantitative"
                    checked={formData.projectApproach === "Quantitative"}
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Quantitative</span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Mixed Methods"
                    checked={formData.projectApproach === "Mixed Methods"}
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Mixed Methods</span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Action Research"
                    checked={formData.projectApproach === "Action Research"}
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Action Research</span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Experimental/ Laboratory"
                    checked={
                      formData.projectApproach === "Experimental/ Laboratory"
                    }
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Experimental/ Laboratory</span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="radio"
                    name="projectApproach"
                    value="Other"
                    checked={formData.projectApproach === "Other"}
                    onChange={(e) =>
                      updateField("projectApproach", e.target.value)
                    }
                    className="w-6 h-6 border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>Other</span>
                </label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="otherApproach" required>
                    Other
                  </label>
                  <input
                    type="text"
                    value={formData.otherApproach || ""}
                    onChange={(e) =>
                      updateField("otherApproach", e.target.value)
                    }
                    placeholder="Specify here"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
                <br />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    4.5 Is this project interdisciplinary?
                  </label>
                  <select
                    value={formData.isInterdisciplinary || ""}
                    onChange={(e) =>
                      updateField("isInterdisciplinary", e.target.value)
                    }
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <br />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    4.6 Will this project involve human participants or
                    sensitive data?
                  </label>
                  <select
                    value={formData.requiresEthics ?? ''}
                    onChange={(e) =>
                      updateField("requiresEthics", e.target.value)
                    }
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes- ethics approval obtained</option>
                    <option value="">Yes- ethics approval pending</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <br />
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectAbstract" required>
                    4.7 Project Abstract{" "}
                  </label>
                  <textarea
                    type="text"
                    value={formData.abstract ?? ''}
                    onChange={(e) => updateField("abstract", e.target.value)}
                    placeholder="Summarize the problem, research approach and expected contribution"
                    className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                5. Technical Research Proposal
              </h3>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  5.1 Background & Justification
                </label>
                <textarea
                  value={formData.backgroundJustification || ""}
                  onChange={(e) =>
                    updateField("backgroundJustification", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[120px]"
                  placeholder="Provide the context for your study. What is the current state of knowledge? What gap does this research address?"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  5.2 Problem Statement
                </label>
                <textarea
                  value={formData.problemStatement || ""}
                  onChange={(e) =>
                    updateField("problemStatement", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[120px]"
                  placeholder="Clearly and concisely articulate the specific research problem being addressed."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  5.3 Research Objectives
                </label>
                <textarea
                  value={formData.objectives || ""}
                  onChange={(e) => updateField("objectives", e.target.value)}
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[120px]"
                  placeholder="State your main objective and specific sub-objectives. Example: 1. To examine... 2. To assess... 3. To develop..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  5.4 Research Methodology
                </label>
                <textarea
                  value={formData.methodology}
                  onChange={(e) => updateField("methodology", e.target.value)}
                  placeholder="Describe your research design, data collection methods, sampling strategy, and analysis approach. Demonstrate methodological rigor and feasibility."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[150px]"
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                6. Expected Outputs, Outcomes & Impact
              </h3>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  6.1 Primary Outputs
                </label>
                <textarea
                  value={formData.expectedOutputs ?? ''}
                  onChange={(e) =>
                    updateField("expectedOutputs", e.target.value)
                  }
                  placeholder="List specific deliverables: e.g. peer-reviewed journal articles, conference papers, policy briefs, datasets, prototypes, technical reports."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  6.2 Dissemination Plan{" "}
                </label>
                <textarea
                  value={formData.disseminationPlan ?? ''}
                  onChange={(e) =>
                    updateField("disseminationPlan", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                  placeholder="How will findings be shared? Identify target journals, conferences, and community engagement activities. Note: findings must be presented at a Daystar University dissemination forum"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  6.3 Relevance to Policy, Community Transformation or
                  Commercialization
                </label>
                <textarea
                  value={formData.anticipatedImpact ?? ''}
                  onChange={(e) =>
                    updateField("anticipatedImpact", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                  placeholder="Describe any potential policy influence, community impact, innovation, or commercialization value."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  6.4 Stakeholder and Community Involvement
                </label>
                <textarea
                  value={formData.stakeholderInvolvement || ""}
                  onChange={(e) =>
                    updateField("stakeholderInvolvement", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                  placeholder="Identify any stakeholders, community partners, or external organizations involved in or benefiting from the research."
                />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6 animate-in fade-in">
              <BudgetTable
                budget={formData.budget}
                onBudgetChange={(budget) => updateField("budget", budget)}
                isInnovation={false}
                max={800000}
              />
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  {" "}
                  Budget Justification Narrative
                </label>
                <textarea
                  value={formData.budgetJustificationNarrative || ""}
                  onChange={(e) =>
                    updateField("budgetJustificationNarrative", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                  placeholder="Explain the rationale and necessity of each major expenditure. Demonstrate value for money."
                />
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl font-bold uppercase">
                8. Work Plan & Implementation Schedule
              </h3>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  8.1 Detailed Timeline (Question 34)
                </label>
                <textarea
                  value={formData.workPlanTimeline ?? ''}
                  onChange={(e) =>
                    updateField("workPlanTimeline", e.target.value)
                  }
                  placeholder="List activities you will work on during Month 1-3, Month 4-6, Month 7-9, Month 10-12 and the responsible person"
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[120px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  8.2 Key Milestones and Deliverables
                </label>
                <textarea
                  value={formData.monitoringPlan ?? ''}
                  onChange={(e) =>
                    updateField("monitoringPlan", e.target.value)
                  }
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                  placeholder="List your key milestones, target dates, and the responsible team member for each."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  8.3 Potential Risks and Mitigation measures
                </label>
                <textarea
                  value={formData.riskManagement ?? ''}
                  onChange={(e) =>
                    updateField("riskManagement", e.target.value)
                  }
                  placeholder="Identify key risks to successful implementation and describe your mitigation strategies."
                  className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none min-h-[100px]"
                />
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                9. PI Declaration
              </h3>
              <div className="space-y-4">
                <h5>
                  Read all declarations carefully. By signing this form, the
                  Principal Investigator confirms all statements below.
                </h5>
                <p className="text-md font-bold">I hereby declare that: *</p>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration1 || false}
                    onChange={(e) =>
                      updateField("declaration1", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I am a full-time member of staff at Daystar University,
                    currently at the rank of Lecturer or above.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration2 || false}
                    onChange={(e) =>
                      updateField("declaration2", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I do not currently hold an active Daystar Internal Research
                    Grant, or all obligations for any previous grant have been
                    fully completed and formally closed.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration3 || false}
                    onChange={(e) =>
                      updateField("declaration3", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    All information provided in this application is accurate,
                    complete, and original to the best of my knowledge.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration4 || false}
                    onChange={(e) =>
                      updateField("declaration4", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    If awarded, I will implement the project within the approved
                    period and budget, and comply with all Daystar University
                    research ethics, financial accountability, innovation, and
                    intellectual property requirements.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration5 || false}
                    onChange={(e) =>
                      updateField("declaration5", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I will submit quarterly technical and financial progress
                    reports as required, and present findings at a Daystar
                    University research dissemination forum.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration6 || false}
                    onChange={(e) =>
                      updateField("declaration6", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I will acknowledge the Daystar University Internal Research
                    Grant in all resulting publications, presentations,
                    innovations, reports, and related outputs.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration7 || false}
                    onChange={(e) =>
                      updateField("declaration7", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I understand the grant does not cover personal stipends,
                    tuition, or costs unrelated to approved research activities.
                  </span>
                </label>
                <label htmlFor="" className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.declaration8 || false}
                    onChange={(e) =>
                      updateField("declaration8", e.target.checked)
                    }
                    className="w-5 h-5 min-w-5 shrink-0 rounded border-slate-300 accent-daystar-blue cursor-pointer"
                    required
                  />
                  <span>
                    I consent to the collection and processing of information in
                    this application for grant evaluation and administration
                    purposes.
                  </span>
                </label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="piSignature">
                      PI Full Name (As Signature)
                    </label>
                    <input
                      type="text"
                      value={formData.piSignature ?? ''}
                      onChange={(e) =>
                        updateField("piSignature", e.target.value)
                      }
                      placeholder="Full Name "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      value={formData.date ?? ''}
                      onChange={(e) => updateField("date", e.target.value)}
                      placeholder="Full Name "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hodName">Head of Department- Name</label>
                    <input
                      type="text"
                      value={formData.hodName ?? ''}
                      onChange={(e) => updateField("hodName", e.target.value)}
                      placeholder=" "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hodEmail">Head of Department- Email</label>
                    <input
                      type="text"
                      value={formData.hodEmail ?? ''}
                      onChange={(e) => updateField("hodEmail", e.target.value)}
                      placeholder=" "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <label htmlFor="deanName">Dean- Name</label>
                    <input
                      type="text"
                      value={formData.deanName || ""}
                      onChange={(e) => updateField("deanName", e.target.value)}
                      placeholder=" "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div> */}
                  {/* <div className="flex flex-col gap-2">
                    <label htmlFor="deanDate">Dean- Date</label>
                    <input
                      type="date"
                      value={formData.deanDate || ""}
                      onChange={(e) => updateField("deanDate", e.target.value)}
                      placeholder=" "
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
                      required
                    />
                  </div> */}
                </div>
              </div>
            </div>
          )}
          {/* uploads start here */}
          {step === 10 && (
            <div className="space-y-6 animate-in fade-in pb-10">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                10. Attachments Checklist
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Please upload the required documents.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <FileUploadField
                  label="Technical Proposal document"
                  id="proposal-upload"
                  file={formData.attachments?.proposal}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: {
                        ...(prev.attachments || {}),
                        proposal: file,
                      },
                    }))
                  }
                  required
                />

                <FileUploadField
                  label="Principal Investigator CV"
                  id="piCv-upload"
                  file={formData.attachments?.piCv}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: { ...(prev.attachments || {}), piCv: file },
                    }))
                  }
                  required
                />

                <FileUploadField
                  label="Co-Investigator CV(s) (If Applicable)"
                  id="coIvCv-upload"
                  file={formData.attachments?.coIvCv}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: {
                        ...(prev.attachments || {}),
                        coIvCv: file,
                      },
                    }))
                  }
                />

                <FileUploadField
                  label="Research Assistant/ Postgraduate Student CV(s) (If Applicable)"
                  id="raCv-upload"
                  file={formData.attachments?.raCv}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: { ...(prev.attachments || {}), raCv: file },
                    }))
                  }
                />

                <FileUploadField
                  label="Ethics Approval Certificate or Pending Application Letter (If Applicable)"
                  id="ethics-upload"
                  file={formData.attachments?.ethics}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: {
                        ...(prev.attachments || {}),
                        ethics: file,
                      },
                    }))
                  }
                />

                <FileUploadField
                  label="Gantt Chart/ Detailed Implementation Schedule (Recommended)"
                  id="gantt-upload"
                  file={formData.attachments?.gantt}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: { ...(prev.attachments || {}), gantt: file },
                    }))
                  }
                />

                <FileUploadField
                  label="Letters of Support from Partner Organizations (If Applicable)"
                  id="support-upload"
                  file={formData.attachments?.support}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: {
                        ...(prev.attachments || {}),
                        support: file,
                      },
                    }))
                  }
                />

                <FileUploadField
                  label="Any other relevant supporting documents (If Applicable - Max 4)"
                  id="other-upload"
                  file={formData.attachments?.other}
                  onChange={(file) =>
                    setFormData((prev) => ({
                      ...prev,
                      attachments: { ...(prev.attachments || {}), other: file },
                    }))
                  }
                  multiple={true}
                  maxFiles={4}
                />
              </div>

              <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-center gap-2 mt-8">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p>
                  All completed applications will be sent to:{" "}
                  <strong>drice@daystar.ac.ke</strong>
                </p>
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
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Application Received!
                </h2>
                <p className="text-slate-500 max-w-md mx-auto text-lg">
                  Your Internal Research Grant application has been successfully
                  transmitted to DRICE for review.
                </p>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="bg-daystar-blue text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200"
              >
                Return to Portal
              </button>
            </div>
          )}

          {!status.success && (
            <div className="mt-10 flex justify-between border-t pt-6">
              <button
                type="button"
                onClick={step === 1 ? onBack : prevStep}
                disabled={status.submitting}
                className="px-6 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {step === 1 ? "Cancel" : "Previous Section"}
              </button>
              <button
                type="button"
                onClick={step === 10 ? handleSubmit : nextStep}
                disabled={status.submitting}
                className={`px-10 py-2 rounded-xl font-bold text-white transition-all disabled:opacity-50 ${step === 10 ? "bg-daystar-blue shadow-lg shadow-blue-100" : "bg-daystar-dark hover:bg-slate-800"}`}
              >
                {status.submitting
                  ? "Submitting..."
                  : step === 10
                    ? "Submit Final Application"
                    : "Save & Continue"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InternalGrantForm;
