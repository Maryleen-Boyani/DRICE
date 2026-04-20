/** Section 3: Innovation Overview */
export default function InnovationSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Innovation Overview</h3>

      <form.Field name="innovationTitle">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Title of Innovation / Product / Service *</label>
            <input
              type="text"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Clear and concise — maximum 15 words"
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="innovationStage">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Current Innovation Stage *</label>
            <select
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            >
              <option value="">Select...</option>
              <option>Proof of concept</option>
              <option>Prototype / MVP</option>
              <option>Pilot / Testing</option>
              <option>Early market / Scaling</option>
            </select>
          </div>
        )}
      </form.Field>

      <form.Field name="sector">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Sector / Industry *</label>
            <input
              type="text"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. HealthTech, AgriTech, EdTech..."
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="innovationDescription">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Brief description of the innovation *</label>
            <textarea
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What is the innovation, product, or service? What does it do and how does it work?"
              rows={4}
              className="w-full p-4 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="valueProp">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              What makes this innovation unique? (Value proposition / competitive advantage) *
            </label>
            <textarea
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="How is this different from or better than existing solutions?"
              rows={4}
              className="w-full p-4 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
