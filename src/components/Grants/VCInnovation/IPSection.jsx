const IP_STATUS_OPTIONS = [
  'No IP protection yet',
  'Patent Pending',
  'Patent Granted',
  'Trademark',
  'Copyright',
  'Trade Secret',
];

const CONSENT_OPTIONS = ['Yes', 'No - Explain', 'Open to discussion'];

/** Section 7: Intellectual Property and Equity Arrangements */
export default function IPSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">
        Intellectual Property and Equity Arrangements
      </h3>
      <p className="text-xs text-slate-500">
        Successful applicants may be required to enter into an IP co-ownership and/or equity
        arrangement with Daystar University, subject to negotiation and University policy.
      </p>

      <form.Field name="ipStatus">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Current IP Status of the innovation *</label>
            {IP_STATUS_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ipStatus"
                  value={opt}
                  checked={field.state.value === opt}
                  onChange={() => field.handleChange(opt)}
                  className="accent-daystar-blue"
                />
                <span>{opt}</span>
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ipStatus"
                checked={!!field.state.value && !IP_STATUS_OPTIONS.includes(field.state.value)}
                onChange={() => field.handleChange('')}
                className="accent-daystar-blue"
              />
              <input
                type="text"
                value={IP_STATUS_OPTIONS.includes(field.state.value) ? '' : field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Other..."
                className="p-2 border rounded-lg flex-1"
              />
            </label>
          </div>
        )}
      </form.Field>

      <form.Field name="jointIPConsent">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Are you willing to accept joint IP registration with Daystar University? *
            </label>
            {CONSENT_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jointIPConsent"
                  value={opt}
                  checked={field.state.value === opt}
                  onChange={() => field.handleChange(opt)}
                  className="accent-daystar-blue"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="jointIPExplanation">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Explain if No</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Please explain..."
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="equityConsent">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Are you willing to enter into a negotiated equity arrangement with Daystar University? *
            </label>
            {CONSENT_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="equityConsent"
                  value={opt}
                  checked={field.state.value === opt}
                  onChange={() => field.handleChange(opt)}
                  className="accent-daystar-blue"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="equityExplanation">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Explain if No</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Please explain..."
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="ownershipStructure">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Describe the current ownership structure of this innovation
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Who currently owns or co-owns this innovation? Are there any existing equity arrangements or investor agreements in place?"
              rows={3}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
