const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * POST /api/ai/validate-request
 * @param {{ subject, reason, hasDocument, type }} payload
 * @param {string} token   - Auth token (student or admin)
 * @returns {{ validity, issues[], missingElements[], suggestions[], improvedVersion: { subject, reason } } | null}
 */
export const validateAIRequest = async (payload, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/validate-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[AI:validate] Request failed:", err.message);
    return null;
  }
};
