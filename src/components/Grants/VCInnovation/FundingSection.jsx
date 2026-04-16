import BudgetTable from '../Shared/BudgetTable';

/** Section 6: Funding Requirements */
export default function FundingSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Funding Requirements</h3>

      <form.Field name="requestedAmount">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Amount Requested (Ksh) *</label>
            <input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              placeholder="Enter amount in Ksh (max 1,000,000)"
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="budgetItems">
        {(field) => (
          <BudgetTable
            budget={field.state.value}
            onBudgetChange={(newBudget) => field.handleChange(newBudget)}
            isInnovation={true}
            max={1000000}
          />
        )}
      </form.Field>

      <form.Field name="otherFunding">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Have you received or applied for other funding for this innovation? *
            </label>
            <div className="flex gap-6">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="otherFunding"
                    value={option}
                    checked={field.state.value === option}
                    onChange={() => field.handleChange(option)}
                    className="accent-daystar-blue"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="otherFundingDetails">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">If yes, specify funder, amount, and status</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Funder name, amount, and current status..."
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
