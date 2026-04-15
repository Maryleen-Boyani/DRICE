import TeamSection from '../Shared/TeamSection';

/** Section 2: Innovation Team Composition */
export default function TeamCompositionSection({ form }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h3 className="text-xl font-bold text-daystar-blue">Innovation Team</h3>

      <form.Field name="team">
        {(field) => (
          <TeamSection
            data={field.state.value}
            onChange={(newTeam) => field.handleChange(newTeam)}
            isInnovation={true}
          />
        )}
      </form.Field>

      <form.Field name="facultyMentor">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Primary Faculty Mentor / Supervisor</label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Name, title, department, and email of faculty mentor"
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="teamExpertise">
        {(field) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">
              Describe how the team&apos;s combined expertise supports this innovation
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Explain the relevant skills, experience, and roles that each member brings to the project."
              rows={4}
              className="p-3 border rounded-lg"
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
