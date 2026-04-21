const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/grants";

const DEFAULT_TIMEOUT_MS = 15_000;
const RETRY_ATTEMPTS = 2;
const RETRY_DELAY_MS = 500;

// ─── Error class ────────────────────────────────────────────────────────────

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status        - HTTP status code (0 = network failure)
   * @param {object[]} [errors]    - Field-level validation errors from the server
   */
  constructor(message, status, errors = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }

  get isValidation() { return this.status === 400; }
  get isServerError() { return this.status >= 500; }
  get isNetworkError() { return this.status === 0; }
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Parses a fetch Response. Throws ApiError on non-2xx or unparseable bodies.
 * @param {Response} response
 * @returns {Promise<object>}
 */
async function parseResponse(response) {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!isJson) {
    const preview = (await response.text()).slice(0, 120);
    throw new ApiError(
      `Unexpected response format (${response.status})`,
      response.status
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message ?? `Request failed with status ${response.status}`,
      response.status,
      data.errors ?? []
    );
  }

  return data;
}

/**
 * Wraps fetch with a timeout via AbortController.
 * @param {string} url
 * @param {RequestInit} options
 * @param {number} [timeoutMs]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, options, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  console.log(`[API] ${options.method || 'GET'} ${url}`);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    console.log(`[API] Response ${response.status} from ${url}`);
    return response;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new ApiError(`Request timed out after ${timeoutMs / 1000}s`, 0);
    }
    throw new ApiError("Network error — please check your connection.", 0);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Retries a fetch call on server errors (5xx) or network failures.
 * Validation errors (4xx) are not retried.
 * @param {() => Promise<Response>} fn
 * @param {number} [attempts]
 * @returns {Promise<object>}
 */
async function withRetry(fn, attempts = RETRY_ATTEMPTS) {
  let lastError;

  for (let i = 0; i <= attempts; i++) {
    try {
      const response = await fn();
      return await parseResponse(response);
    } catch (err) {
      lastError = err;
      const shouldRetry =
        i < attempts &&
        err instanceof ApiError &&
        (err.isServerError || err.isNetworkError);

      if (!shouldRetry) break;

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * 2 ** i));
    }
  }

  throw lastError;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Step 1 — Saves the application to the DB.
 * Returns the created application including its generated `id`.
 *
 * @param {FormData} formData
 * @returns {Promise<{ success: boolean, data: object }>}
 * @throws {ApiError}
 */
export async function submitInternalGrantApplication(formData) {
  return withRetry(() =>
    fetchWithTimeout(`${API_BASE}/internal-research`, {
      method: "POST",
      body: formData, // multipart — no Content-Type header; browser sets boundary
    })
  );
}

/**
 * Step 2 — Triggers grant submission + applicant confirmation emails.
 * Call this after submitInternalGrantApplication resolves successfully.
 *
 * @param {string} applicantId   - The `id` returned from Step 1
 * @param {object} formData      - The same plain form data sent in Step 1
 * @returns {Promise<{ success: boolean, message: string }>}
 * @throws {ApiError}
 */
export async function sendInternalGrantConfirmation(applicantId, formData) {
  const body = new FormData();
  body.append("data", JSON.stringify(formData));

  return withRetry(() =>
    fetchWithTimeout(`${API_BASE}/internal-research/${applicantId}/confirm`, {
      method: "POST",
      body,
    })
  );
}

/**
 * Submits a VC Innovation application.
 *
 * @param {object} data
 * @returns {Promise<{ success: boolean, data: object }>}
 * @throws {ApiError}
 */
export async function submitVcInnovationApplication(data) {
  return withRetry(() =>
    fetchWithTimeout(`${API_BASE}/vc-innovation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

/**
 * Fetches a single VC Innovation application by ID.
 *
 * @param {string} id
 * @returns {Promise<{ success: boolean, data: object }>}
 * @throws {ApiError}
 */
export async function getVcInnovationApplication(id) {
  return withRetry(() =>
    fetchWithTimeout(`${API_BASE}/vc-innovation/${id}`, { method: "GET" })
  );
}