const DECLARATION_ITEMS = [
  'I meet the eligibility criteria for this call and all information provided in this application is accurate and complete.',
  'I have a working MVP or clearly advanced innovation with demonstrated commercialization potential.',
  'I am willing, where applicable, to enter into a negotiated equity arrangement with Daystar University.',
  'I am willing, where applicable, to accept joint Intellectual Property (IP) registration with Daystar University in accordance with University policy.',
  'I agree to adhere to all Daystar University policies and guidelines governing research, innovation, commercialization, IP, and project management.',
  'I understand that if shortlisted, I will be required to pitch before a selection panel.',
  'I understand that multiple or duplicate applications will not be evaluated.',
  'I consent to Daystar University collecting and processing information in this application for grant evaluation and administration purposes.',
  'I acknowledge that only successful applicants after the pitching stage will be contacted.',
];

/** Section 10: Declaration */
export default function DeclarationSection({ form }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h3 className="text-xl font-bold">I hereby confirm and declare that:</h3>
      <p className="text-xs text-slate-500">Please confirm all 9 items below.</p>

      <form.Field name="declarationAccepted">
        {(field) => (
          <div className="space-y-3">
            {DECLARATION_ITEMS.map((item, i) => (
              <label key={i} className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.state.value === true}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-6 h-6 mt-0.5 accent-daystar-blue cursor-pointer shrink-0"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </form.Field>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <form.Field name="applicantSignatureName">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Lead Applicant Full Name (as signature) *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Full Name"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="declarationDate">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Date *</label>
              <input
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="mentorSignatureName">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Faculty Mentor Name &amp; Signature (if applicable)</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Mentor full name"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="mentorSignatureDate">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Mentor Date</label>
              <input
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
}
