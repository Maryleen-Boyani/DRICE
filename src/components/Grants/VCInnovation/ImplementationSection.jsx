/** Section 8: Implementation Plan */
export default function ImplementationSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Implementation Plan</h3>

      <form.Field name="fundingActivities">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">What specific activities will this funding support?</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="List the key activities you plan to undertake with this funding, including product refinement, testing, regulatory processes, market entry, etc."
              rows={4}
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="successMetrics">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Expected outcomes and success metrics</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What will success look like? How will you measure it? Include quantitative targets where possible."
              rows={4}
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="risks">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Risks and mitigation strategies</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Identify the main risks to achieving your goals and how you plan to address them."
              rows={4}
              className="w-full p-3 border-2 border-slate-100 rounded-xl"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
