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
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Users className="text-daystar-blue" size={24} />
                        {isInnovation ? '2. Innovation Team' : '3. Research Team Composition'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                        {isInnovation
                            ? "List all team members. Multi-disciplinary teams are highly encouraged."
                            : "Include Co-PIs and Research Assistants (maximum 5 recommended)."}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={addMember}
                    className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-all border border-blue-200 text-daystar-blue hover:bg-blue-50 hover:scale-[1.02]"
                >
                    <Plus size={16} /> Add Member
                </button>
            </div>

            <div className="grid gap-6">
                {data.map((member, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-slate-50/50 p-6 rounded-2xl border border-slate-200 transition-all hover:bg-white hover:shadow-sm"
                    >
                        <button
                            type="button"
                            onClick={() => removeMember(idx)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            title="Remove Member"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={member.name ?? ''}
                                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue outline-none transition-all"
                                        placeholder="e.g. Dr. Jane Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                                    {isInnovation ? 'ID Number' : 'Institution'}
                                </label>
                                <div className="relative">
                                    {isInnovation ? <GraduationCap size={16} className="absolute right-4 top-4 text-slate-400" /> : <Building size={16} className="absolute right-4 top-4 text-slate-400" />}
                                    <input
                                        type="text"
                                        value={(isInnovation ? member.id : member.institution) ?? ''}
                                        onChange={(e) => handleMemberChange(idx, isInnovation ? 'id' : 'institution', e.target.value)}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue outline-none transition-all"
                                        placeholder={isInnovation ? "DU-XXXX" : "Daystar University"}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Role in Project</label>
                                <input
                                    type="text"
                                    value={member.role ?? ''}
                                    onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue outline-none transition-all"
                                    placeholder={isInnovation ? "Lead Developer / Designer" : "Co-Investigator / RA"}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Institutional Email</label>
                                <input
                                    type="email"
                                    value={member.email ?? ''}
                                    onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue outline-none transition-all"
                                    placeholder="name@daystar.ac.ke"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                                    {isInnovation ? 'Department / Major' : 'Area of Specialization'}
                                </label>
                                <input
                                    type="text"
                                    value={(isInnovation ? member.department : member.specialization) ?? ''}
                                    onChange={(e) => handleMemberChange(idx, isInnovation ? 'department' : 'specialization', e.target.value)}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-offset-2 focus:ring-daystar-blue outline-none transition-all"
                                    placeholder="e.g. Computer Science"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isInnovation && (
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 text-sm text-blue-800 flex items-center justify-center font-medium mt-4">
                    <span>Multi-disciplinary teams comprising of students and faculty are highly encouraged for the VC Innovation Grant.</span>
                </div>
            )}
        </div>
    );
};

export default TeamSection;