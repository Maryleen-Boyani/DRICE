import React from 'react';
import FileUploadField from '../Shared/FileUploadField';

/**
 * Section 11: Attachments
 * Applicants upload supporting documents.
 */
export default function AttachmentsSection({ form }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h3 className="text-xl font-bold text-slate-800">Attachments Checklist</h3>
      <p className="text-sm text-slate-500">
        Please upload the required documents.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <form.Field name="cvFile">
          {(field) => (
            <FileUploadField
              label="CV / Resume of lead applicant"
              id="cv-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
              required
            />
          )}
        </form.Field>

        <form.Field name="mvpPhotosFile">
          {(field) => (
            <FileUploadField
              label="Photos or screenshots of the MVP / prototype"
              id="mvp-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
              required
            />
          )}
        </form.Field>

        <form.Field name="demoVideoFile">
          {(field) => (
            <FileUploadField
              label="Demo video or product demonstration (recommended)"
              id="video-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
              accept=".mp4"
            />
          )}
        </form.Field>

        <form.Field name="researchPapersFile">
          {(field) => (
            <FileUploadField
              label="Research paper(s) linked to the innovation"
              id="research-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
            />
          )}
        </form.Field>

        <form.Field name="lettersOfIntentFile">
          {(field) => (
            <FileUploadField
              label="Letters of intent or support from partners"
              id="loi-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
            />
          )}
        </form.Field>

        <form.Field name="marketResearchFile">
          {(field) => (
            <FileUploadField
              label="Market research or validation data"
              id="market-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
            />
          )}
        </form.Field>

        <form.Field name="ipDocumentsFile">
          {(field) => (
            <FileUploadField
              label="Existing IP registration documents"
              id="ip-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
            />
          )}
        </form.Field>

        <form.Field name="otherDocumentsFile">
          {(field) => (
            <FileUploadField
              label="Any other supporting documents (Max 4)"
              id="other-upload"
              file={field.state.value}
              onChange={(file) => field.handleChange(file)}
              multiple={true}
              maxFiles={4}
            />
          )}
        </form.Field>
      </div>

      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-center gap-2 mt-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <p>All completed applications are submitted to: <strong>drice@daystar.ac.ke</strong></p>
      </div>
    </div>
  );
}
