const REVENUE_MODELS = [
  'Product Sales',
  'Subscription / SaaS',
  'Licensing / Royalties',
  'Service Fees',
  'Freemium',
];

/** Section 5: Commercialization Plan */
export default function CommercializationSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Commercialization Plan</h3>

      <form.Field name="revenueModel">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Revenue Model *</label>
            {REVENUE_MODELS.map((model) => (
              <label key={model} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="revenueModel"
                  value={model}
                  checked={field.state.value === model}
                  onChange={() => field.handleChange(model)}
                  className="accent-daystar-blue"
                />
                <span>{model}</span>
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="revenueModel"
                checked={!!field.state.value && !REVENUE_MODELS.includes(field.state.value)}
                onChange={() => field.handleChange('')}
                className="accent-daystar-blue"
              />
              <input
                type="text"
                value={REVENUE_MODELS.includes(field.state.value) ? '' : field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Other..."
                className="p-2 border rounded-lg flex-1"
              />
            </label>
          </div>
        )}
      </form.Field>

      <form.Field name="marketSize">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Market Size &amp; Opportunity</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe the total addressable market, target market size, and growth potential."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="traction">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Current traction and validation evidence</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe any existing customers, users, pilots, letters of intent, partnerships, sales, or other validation achieved so far."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="commercializationStrategy">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Commercialization strategy and planned activities</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe your go-to-market approach, key milestones for product launch, and scale-up strategy."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="competition">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Competitive landscape</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Who are your main competitors? How does your solution compare and what is your sustainable competitive advantage?"
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="partnerships">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Strategic partnerships and stakeholder engagement</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Identify any existing or planned partnerships with industry, government, NGOs, or other universities."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
