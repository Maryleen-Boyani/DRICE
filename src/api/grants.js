const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/grants";

/**
 * Submits an Internal Research grant application to the backend.
 *
 * @param {FormData} formData - The FormData containing form values and files
 * @returns {Promise<{ success: boolean, data?: object, errors?: object[] }>}
 * @throws Will throw if the network request itself fails
 */
export async function submitInternalGrantApplication(formData) {
  const response = await fetch(`${API_BASE}/internal-research`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}
export async function submitVcInnovationApplication(data) {
  const response = await fetch(`${API_BASE}/vc-innovation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Fetches a single VC Innovation application by ID.
 *
 * @param {string} id - The application UUID
 * @returns {Promise<{ success: boolean, data?: object }>}
 */
export async function getVcInnovationApplication(id) {
  const response = await fetch(`${API_BASE}/vc-innovation/${id}`);
  return response.json();
}
