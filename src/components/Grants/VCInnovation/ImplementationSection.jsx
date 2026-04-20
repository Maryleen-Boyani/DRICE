/** Section 8: Implementation Plan */
export default function ImplementationSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Implementation Plan</h3>

      <form.Field name="fundingActivities">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Proposed activities to be funded by the Innovation Grant *
            </label>
            <textarea
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Detail exactly how you will use the grant funds to achieve your next milestones."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="successMetrics">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Expected outcomes and success metrics *
            </label>
            <textarea
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What specific results do you expect to achieve? How will you measure success?"
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="risks">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Potential risks and mitigation strategies *
            </label>
            <textarea
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What could go wrong? How will you prevent or manage these risks?"
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
