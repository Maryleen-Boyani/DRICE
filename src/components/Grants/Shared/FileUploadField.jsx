import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, X, File, FileCode, FileArchive } from 'lucide-react';

/**
 * A sub-component to render an individual file entry.
 */
const FileEntry = ({ file, onRemove, preview }) => {
  return (
    <div className="relative group border border-slate-200 rounded-xl p-3 bg-white hover:bg-slate-50 flex items-center gap-3 transition-colors duration-200">
      {/* Thumbnail / Icon */}
      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all" />
        ) : (
          <FileText className="text-slate-700" size={24} />
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-[10px] text-slate-500 font-medium">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>

      {/* Google-style Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all rounded-full"
        title="Remove file"
      >
        <X size={18} />
      </button>
    </div>
  );
};

/**
 * A modern file upload field with support for single or multiple files.
 * 
 * @param {string} label - The label for the field
 * @param {File | File[] | null} file - The currently selected file(s)
 * @param {function} onChange - Callback when file(s) change
 * @param {string} id - Unique ID for the input
 * @param {boolean} required - Whether the field is required
 * @param {string} accept - File types to accept
 * @param {boolean} multiple - Whether to allow multiple files
 * @param {number} maxFiles - Maximum number of files allowed (if multiple is true)
 */
const FileUploadField = ({ 
  label, 
  file, 
  onChange, 
  id, 
  required = false, 
  accept = ".pdf,.doc,.docx,.jpg,.png",
  multiple = false,
  maxFiles = 1
}) => {
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    const files = multiple ? (Array.isArray(file) ? file : []) : (file ? [file] : []);
    
    // Cleanup old previews
    Object.values(previews).forEach(url => URL.revokeObjectURL(url));
    
    const newPreviews = {};
    files.forEach((f, idx) => {
      if (f.type.startsWith('image/')) {
        newPreviews[f.name + idx] = URL.createObjectURL(f);
      }
    });
    
    setPreviews(newPreviews);

    return () => {
      Object.values(newPreviews).forEach(url => URL.revokeObjectURL(url));
    };
  }, [file, multiple]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (multiple) {
      const currentFiles = Array.isArray(file) ? file : [];
      const newFiles = [...currentFiles, ...selectedFiles].slice(0, maxFiles);
      onChange(newFiles);
    } else {
      onChange(selectedFiles[0]);
    }
    
    // Reset input so the same file can be selected again if removed
    e.target.value = '';
  };

  const removeFile = (index) => {
    if (multiple) {
      const currentFiles = Array.isArray(file) ? file : [];
      const newFiles = currentFiles.filter((_, i) => i !== index);
      onChange(newFiles);
    } else {
      onChange(null);
    }
  };

  const filesArray = multiple ? (Array.isArray(file) ? file : []) : (file ? [file] : []);
  const canAddMore = !multiple ? filesArray.length === 0 : filesArray.length < maxFiles;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="text-sm font-bold text-slate-800 flex items-center gap-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {multiple && maxFiles > 1 && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {filesArray.length} / {maxFiles} Files
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        {filesArray.map((f, idx) => (
          <FileEntry 
            key={f.name + idx} 
            file={f} 
            preview={previews[f.name + idx]} 
            onRemove={() => removeFile(idx)} 
          />
        ))}

        {canAddMore && (
          <label
            htmlFor={id}
            className="relative group border-2 border-dashed border-slate-200 rounded-xl p-8 bg-slate-50 hover:bg-white hover:border-slate-800 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-slate-800 group-hover:scale-110 transition-all">
              <Upload size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-600">
                {multiple ? (filesArray.length === 0 ? "Click to upload files" : "Add another file") : "Click to upload or drag & drop"}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter font-extrabold px-3 py-0.5 rounded-full border border-slate-100">
                {accept.replace(/\./g, '').toUpperCase().split(',').join(' • ')}
              </p>
            </div>
            <input
              id={id}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;
