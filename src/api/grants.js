const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/grants";

/**
 * Submits an Internal Research grant application to the backend.
 *
 * @param {FormData} formData - The FormData containing form values and files
 * @returns {Promise<{ success: boolean, data?: object, errors?: object[] }>}
 * @throws Will throw if the network request itself fails
 */
async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (!response.ok) {
      return { 
        success: false, 
        message: data.message || "Request failed", 
        errors: data.errors 
      };
    }
    return data;
  } else {
    // Handle non-JSON responses (like HTML error pages)
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Server error (${response.status}): ${text.slice(0, 100)}...`);
    }
    return { success: true, message: "Request completed, but returned non-JSON response" };
  }
}

export async function submitInternalGrantApplication(formData) {
  const response = await fetch(`${API_BASE}/internal-research`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}

export async function submitVcInnovationApplication(data) {
  const response = await fetch(`${API_BASE}/vc-innovation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
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
