import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image as ImageIcon, X, File, FileCode, FileArchive } from 'lucide-react';

/**
 * A sub-component to render an individual file entry.
 */
const FileEntry = ({ file, onRemove, preview }) => {
  return (
    <div className="relative group border border-slate-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md flex items-center gap-4 transition-all duration-200">
      {/* Thumbnail / Icon */}
      <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <FileText className="text-daystar-blue" size={24} />
        )}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>

      {/* Google-style Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-full border border-transparent hover:border-red-100"
        title="Remove file"
      >
        <X size={18} />
      </button>
    </div>
  );
};

/**
 * A modern file upload field with support for single or multiple files.
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
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <div className="flex justify-between items-end">
          <label htmlFor={id} className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            {label} {required && <span className="text-daystar-blue">*</span>}
          </label>
          {multiple && maxFiles > 1 && (
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md tracking-wider">
              {filesArray.length} OF {maxFiles}
            </span>
          )}
        </div>
      )}

      <div className="space-y-4">
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
            className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-10 bg-slate-50/50 hover:bg-blue-50/50 hover:border-daystar-blue/40 hover:shadow-inner transition-all cursor-pointer flex flex-col items-center justify-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-daystar-blue group-hover:scale-110 group-hover:shadow-md transition-all">
              <Upload size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700 group-hover:text-daystar-blue transition-colors">
                {multiple ? (filesArray.length === 0 ? "Click here to upload files" : "Add another file") : "Click here to upload or drag & drop"}
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide">
                Supported formats: {accept.replace(/\./g, '').toUpperCase().split(',').join(', ')}
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
