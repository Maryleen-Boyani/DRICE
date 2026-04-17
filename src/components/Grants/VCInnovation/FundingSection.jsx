import BudgetTable from '../Shared/BudgetTable';

/** Section 6: Funding Requirements */
export default function FundingSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">6. Funding Requirements</h3>

      <form.Field name="requestedAmount">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Amount Requested (Ksh) *</label>
            <input
              type="number"
              value={field.state.value}
              onChange={(e) => {
                const val = e.target.value;
                field.handleChange(val === '' ? '' : Number(val));
              }}
              placeholder="Enter amount in Ksh (max 800,000)"
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
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
          <div className="flex flex-col gap-2 mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Have you received or applied for other funding for this innovation? *
            </label>
            <div className="flex gap-6 mt-1">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 px-6 py-3 rounded-xl hover:bg-white transition-all">
                  <input
                    type="radio"
                    name="otherFunding"
                    value={option}
                    checked={field.state.value === option}
                    onChange={() => field.handleChange(option)}
                    className="w-4 h-4 text-daystar-blue accent-daystar-blue"
                  />
                  <span className="font-medium text-slate-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="otherFundingDetails">
        {(field) => (
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-slate-700">If yes, specify funder, amount, and status</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Funder name, amount, and current status..."
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue transition-all outline-none"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
