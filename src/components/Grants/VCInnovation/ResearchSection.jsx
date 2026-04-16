/** Section 4: Research and Evidence Base */
export default function ResearchSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Research and Evidence Base</h3>

      <form.Field name="isResearchBased">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Is the innovation based on a specific research project? *
            </label>
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isResearchBased"
                  value={option}
                  checked={field.state.value === option}
                  onChange={() => field.handleChange(option)}
                  className="accent-daystar-blue"
                />
                <span>{option === 'No' ? 'No — explain how the innovation is evidence-based' : 'Yes'}</span>
              </label>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="evidenceBasis">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">If no, briefly explain the evidence / research basis</label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your answer"
              rows={3}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="researchPaperDetails">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Research paper details (if applicable)</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Title | Authors | Journal / Conference | Status | Expected submission date"
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="researchSummary">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Summary of key research findings that underpin this innovation
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Briefly describe how the research evidence supports the innovation and its commercialization potential."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
