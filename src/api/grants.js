const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

/**
 * Submits a VC Innovation grant application to the backend.
 *
 * @param {object} data - The full form values from TanStack Form
 * @returns {Promise<{ success: boolean, data?: object, errors?: object[] }>}
 * @throws Will throw if the network request itself fails
 */
export async function submitVcInnovationApplication(data) {
  const response = await fetch(`${API_BASE}/api/grants/vc-innovation`, {
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
  const response = await fetch(`${API_BASE}/api/grants/vc-innovation/${id}`);
  return response.json();
}
