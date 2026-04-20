import React, { useMemo } from "react";
import { Plus, Trash2, Calculator, Info } from "lucide-react";

/**
 * Shared Budget Component
 * @param {Array} budget - Array of budget objects
 * @param {Function} onBudgetChange - Updates the parent state
 * @param {number} max - Optional maximum amount limit
 * @param {boolean} isInnovation - Toggles VC Grant specific labels
 */
const BudgetTable = ({
  budget,
  onBudgetChange,
  max = 800000,
  isInnovation = false,
}) => {
  // Categories based on Section 7 of the Internal Grant / Section 6 of VC Grant
  const categories = isInnovation
    ? [
        "Product Development",
        "Market Validation",
        "IP Registration",
        "Equipment",
        "Consumables",
        "Travel",
        "Personnel",
        "Other",
      ]
    : [
        "Equipment",
        "Consumables",
        "Fieldwork/Travel",
        "Personnel/RA",
        "Dissemination",
        "Software/Licenses",
        "Other",
      ];

  const total = useMemo(() => {
    return budget.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [budget]);

  const handleRowChange = (index, field, value) => {
    const newBudget = [...budget];
    newBudget[index][field] = value;
    onBudgetChange(newBudget);
  };

  const addRow = () => {
    onBudgetChange([
      ...budget,
      { description: "", category: "", amount: "", justification: "" },
    ]);
  };

  const removeRow = (index) => {
    if (budget.length === 1) return;
    onBudgetChange(budget.filter((_, i) => i !== index));
  };

  const isOverBudget = max && total > max;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="text-daystar-blue" size={24} />
            {isInnovation ? "6. Requested Funding" : "7. Detailed Budget"}
          </h3>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Provide a clear breakdown of all costs.{" "}
            {max && `Maximum: KSh ${max.toLocaleString()}`}
          </p>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 text-sm font-bold text-daystar-blue hover:bg-blue-50 px-4 py-2 border border-blue-200 rounded-xl transition-all hover:scale-[1.02]"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Description / Item</th>
              <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider w-48">Category</th>
              <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider w-40">Amount (KSh)</th>
              <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider">Justification</th>
              <th className="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {budget.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-3">
                  <input
                    type="text"
                    value={row.description ?? ''}
                    onChange={(e) =>
                      handleRowChange(idx, "description", e.target.value)
                    }
                    placeholder="e.g. Laboratory reagents"
                    className="w-full p-3 text-sm bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-offset-0 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </td>
                <td className="p-3">
                  <select
                    value={row.category ?? ''}
                    onChange={(e) =>
                      handleRowChange(idx, "category", e.target.value)
                    }
                    className="w-full p-3 text-sm bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-offset-0 focus:ring-daystar-blue transition-all outline-none"
                    required
                  >
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={row.amount ?? ''}
                    onChange={(e) =>
                      handleRowChange(idx, "amount", e.target.value)
                    }
                    placeholder=""
                    className="w-full p-3 text-sm bg-slate-50 font-mono border border-transparent rounded-lg focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-offset-0 focus:ring-daystar-blue transition-all outline-none"
                    required
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={row.justification ?? ''}
                    onChange={(e) =>
                      handleRowChange(idx, "justification", e.target.value)
                    }
                    placeholder="Why is this needed?"
                    className="w-full p-3 text-sm bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-offset-0 focus:ring-daystar-blue transition-all outline-none"
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(idx)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-200">
            <tr>
              <td colSpan="2" className="p-5 text-right font-bold text-slate-700">
                Total Requested Amount:
              </td>
              <td
                className={`p-5 font-mono font-bold text-lg \${isOverBudget ? "text-red-600" : "text-emerald-600"}`}
              >
                KSh {total.toLocaleString()}
              </td>
              <td colSpan="2" className="p-5">
                {isOverBudget && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-50 px-4 py-2 rounded-lg w-fit">
                    <Info size={16} /> Exceeds maximum limit
                  </div>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl flex gap-3 text-slate-600 text-sm italic font-medium">
        <Info className="shrink-0 text-slate-400 mt-0.5" size={18} />
        <p>
          {isInnovation
            ? "Ensure costs align with product development and commercialization milestones."
            : "Note: The grant does not cover personal stipends, tuition, or non-research administrative costs."}
        </p>
      </div>
    </div>
  );
};

export default BudgetTable;
