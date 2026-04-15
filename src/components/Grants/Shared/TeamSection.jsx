import React from 'react';
import { Plus, Trash2, Users, GraduationCap, Building } from 'lucide-react';

/**
 * TeamSection - Manages list of investigators or innovation team members
 * @param {Array} data - Array of member objects
 * @param {Function} onChange - Updates parent state
 * @param {boolean} isInnovation - Toggles VC Grant specific fields (e.g., student IDs)
 */
const TeamSection = ({ data, onChange, isInnovation = false }) => {

    const addMember = () => {
        const newMember = isInnovation
            ? { name: '', role: '', id: '', email: '', department: '' }
            : { name: '', institution: '', role: '', email: '', specialization: '' };
        onChange([...data, newMember]);
    };

    const removeMember = (index) => {
        if (data.length === 1) return;
        onChange(data.filter((_, i) => i !== index));
    };

    const handleMemberChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {isInnovation ? '2: Innovation Team' : '3: Research Team Composition '}
                    </h3>
                    <br />
                    <h5>Project Team (Co-Investigators)</h5>
                    <p className="text-xs text-slate-500 mt-1">
                        {isInnovation
                            ? "List all team members. Multi-disciplinary teams are highly encouraged."
                            : "Include Co-PIs and Research Assistants (maximum 5 recommended)."}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={addMember}
                    className={`flex items-center gap-1 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${isInnovation ? "text-daystar-blue hover:bg-blue-50" : "text-daystar-blue hover:bg-blue-50"
                        }`}
                >
                    Add Member
                </button>
            </div>

            <div className="grid gap-4">
                {data.map((member, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all"
                    >
                        <button
                            type="button"
                            onClick={() => removeMember(idx)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-daystar-blue outline-none"
                                        placeholder="e.g. Dr. Jane Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                                    {isInnovation ? 'ID Number' : 'Institution'}
                                </label>
                                <div className="relative">
                                    {isInnovation ? <GraduationCap size={14} className="absolute right-3 top-3 text-slate-300" /> : <Building size={14} className="absolute right-3 top-3 text-slate-300" />}
                                    <input
                                        type="text"
                                        value={isInnovation ? member.id : member.institution}
                                        onChange={(e) => handleMemberChange(idx, isInnovation ? 'id' : 'institution', e.target.value)}
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-daystar-blue outline-none"
                                        placeholder={isInnovation ? "DU-XXXX" : "Daystar University"}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Role in Project</label>
                                <input
                                    type="text"
                                    value={member.role}
                                    onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder={isInnovation ? "Lead Developer / Designer" : "Co-Investigator / RA"}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Institutional Email</label>
                                <input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="name@daystar.ac.ke"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">
                                    {isInnovation ? 'Department / Major' : 'Area of Specialization'}
                                </label>
                                <input
                                    type="text"
                                    value={isInnovation ? member.department : member.specialization}
                                    onChange={(e) => handleMemberChange(idx, isInnovation ? 'department' : 'specialization', e.target.value)}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. Computer Science"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isInnovation && (
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 text-sm text-orange-800 italic">
                    <strong>Note:</strong> Multi-disciplinary teams comprising of students and faculty are highly encouraged for the VC Innovation Grant.
                </div>
            )}
        </div>
    );
};

export default TeamSection;