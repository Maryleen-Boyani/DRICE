/** Section 9: Evaluation Criteria Reference (read-only, no form fields) */
export default function EvaluationSection() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Evaluation Criteria Reference</h3>
      <p className="text-xs text-slate-500">
        Concept notes will be evaluated against the following criteria. Use this as a
        self-assessment guide before submitting.
      </p>
      <img src="/criteria.png" alt="Evaluation criteria table" className="rounded-xl border" />
    </div>
  );
}
