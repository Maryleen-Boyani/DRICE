import { supabase } from '../services/supabase';

const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET ?? 'grant-documents';

function safeName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function buildReferenceId(folder, fileName) {
  const randomPart = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return `${folder}/${randomPart}_${safeName(fileName)}`;
}

/**
 * Upload a single file to Supabase Storage.
 * Returns a storage reference ID that can be persisted in the backend.
 */
export async function uploadFile({ file, folder = 'vc-innovation' }) {
  if (!file) {
    throw new Error('No file selected for upload');
  }

  const referenceId = buildReferenceId(folder, file.name);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(referenceId, file, { upsert: false });

  if (error) {
    throw new Error(error.message || 'Failed to upload file');
  }

  const { data: publicUrlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(referenceId);

  return {
    bucket: STORAGE_BUCKET,
    referenceId,
    publicUrl: publicUrlData.publicUrl,
  };
}