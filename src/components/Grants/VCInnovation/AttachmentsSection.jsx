/**
 * Section 11: Attachments
 * Applicants paste shareable URLs (Google Drive, Dropbox, etc.)
 */
export default function AttachmentsSection({ form }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h3 className="text-xl font-bold text-slate-800">Attachments Checklist</h3>
      <p className="text-sm text-slate-500">
        Paste a shareable link (Google Drive, Dropbox, OneDrive) for each document.
        Ensure links are set to &quot;anyone with the link can view&quot;.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <form.Field name="cvUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">CV / Resume of lead applicant *</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="mvpPhotosUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Photos or screenshots of the MVP / prototype *</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="demoVideoUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Demo video or product demonstration link (recommended)</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://youtube.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="researchPapersUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Research paper(s) linked to the innovation</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="lettersOfIntentUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Letters of intent or support from potential customers / partners</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="marketResearchUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Market research or validation data</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="ipDocumentsUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Existing IP registration documents</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>

        <form.Field name="otherDocumentsUrl">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Any other supporting documents</label>
              <input type="url" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="https://drive.google.com/..." className="p-3 border rounded-lg" />
            </div>
          )}
        </form.Field>
      </div>

      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
        All completed applications are submitted to: <strong>drice@daystar.ac.ke</strong>
      </div>
    </div>
  );
}
