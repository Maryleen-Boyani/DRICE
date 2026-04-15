import React, { useMemo } from 'react';
import { Plus, Trash2, Calculator, Info } from 'lucide-react';

/**
 * Shared Budget Component
 * @param {Array} budget - Array of budget objects
 * @param {Function} onBudgetChange - Updates the parent state
 * @param {number} max - Optional maximum amount limit
 * @param {boolean} isInnovation - Toggles VC Grant specific labels
 */
const BudgetTable = ({ budget, onBudgetChange, max = 800000, isInnovation = false }) => {

    // Categories based on Section 7 of the Internal Grant / Section 6 of VC Grant
    const categories = isInnovation
        ? ['Product Development', 'Market Validation', 'IP Registration', 'Equipment', 'Consumables', 'Travel', 'Personnel', 'Other']
        : ['Equipment', 'Consumables', 'Fieldwork/Travel', 'Personnel/RA', 'Dissemination', 'Software/Licenses', 'Other'];

    const total = useMemo(() => {
        return budget.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    }, [budget]);

    const handleRowChange = (index, field, value) => {
        const newBudget = [...budget];
        newBudget[index][field] = value;
        onBudgetChange(newBudget);
    };

    const addRow = () => {
        onBudgetChange([...budget, { item: '', category: '', amount: '', justification: '' }]);
    };

    const removeRow = (index) => {
        if (budget.length === 1) return;
        onBudgetChange(budget.filter((_, i) => i !== index));
    };

    const isOverBudget = max && total > max;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {isInnovation ? '6: Requested Funding' : '7: Detailed Budget'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Provide a clear breakdown of all costs. {max && `Maximum: KSh ${max.toLocaleString()}`}
                    </p>
                </div>
                
                <button
                    type="button"
                    onClick={addRow}
                    className="flex items-center gap-1 text-sm font-bold text-daystar-blue hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                >
                    Add Item
                </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-semibold">Description / Item</th>
                            <th className="p-4 font-semibold w-48">Category</th>
                            <th className="p-4 font-semibold w-40">Amount (KSh)</th>
                            <th className="p-4 font-semibold">Justification</th>
                            <th className="p-4 w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {budget.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.item}
                                        onChange={(e) => handleRowChange(idx, 'item', e.target.value)}
                                        placeholder="e.g. Laboratory reagents"
                                        className="w-full p-2 text-sm bg-transparent border-none focus:ring-0"
                                        required
                                    />
                                </td>
                                <td className="p-3">
                                    <select
                                        value={row.category}
                                        onChange={(e) => handleRowChange(idx, 'category', e.target.value)}
                                        className="w-full p-2 text-sm bg-transparent border border-slate-200 rounded-md focus:ring-2 focus:ring-daystar-blue"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </td>
                                <td className="p-3">
                                    <input
                                        type="number"
                                        value={row.amount}
                                        onChange={(e) => handleRowChange(idx, 'amount', e.target.value)}
                                        placeholder="0"
                                        className="w-full p-2 text-sm bg-transparent font-mono border-none focus:ring-0"
                                        required
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.justification}
                                        onChange={(e) => handleRowChange(idx, 'justification', e.target.value)}
                                        placeholder="Why is this needed?"
                                        className="w-full p-2 text-sm bg-transparent border-none focus:ring-0"
                                    />
                                </td>
                                <td className="p-3">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(idx)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold">
                        <tr>
                            <td colSpan="2" className="p-4 text-right text-slate-600">Total Requested Amount:</td>
                            <td className={`p-4 font-mono text-lg ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                                KSh {total.toLocaleString()}
                            </td>
                            <td colSpan="2" className="p-4">
                                {isOverBudget && (
                                    <div className="flex items-center gap-1 text-red-500 text-xs">
                                        <Info size={14} /> Exceeds maximum limit
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-blue-700 text-sm italic">
                <Info className="shrink-0" size={18} />
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