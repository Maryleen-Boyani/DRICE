/** Section 1: Applicant Information */
export default function ApplicantSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Applicant Information</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <form.Field name="firstName">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">First Name *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="First Name"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="lastName">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Last Name *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Last Name"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Applicant Category *</label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-daystar-blue outline-none"
              >
                <option value="">Select category...</option>
                <option>Full-time staff (teaching)</option>
                <option>Full-time staff (non-teaching)</option>
                <option>Student</option>
                <option>Incubatee</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="studentLevel">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Student Level (if applicable)</label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select...</option>
                <option>Certificate</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>PG Diploma</option>
                <option>Masters</option>
                <option>Doctoral</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="staffId">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Student / Staff ID Number *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="ID Number"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="school">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">School / Faculty *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="School or Faculty"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="department">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Department / Programme *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Department or Programme"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Institutional Email *</label>
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="name@daystar.ac.ke"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Phone Number *</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="+254..."
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="orcid">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">ORCID / LinkedIn / Portfolio (if any)</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://..."
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="hasActiveGrant">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Have you previously received a Daystar Innovation Grant? *
              </label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select...</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="prevGrantDetails">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">If yes, Grant Name &amp; Year</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Grant Name & Year"
                className="p-3 border rounded-lg"
              />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
}
