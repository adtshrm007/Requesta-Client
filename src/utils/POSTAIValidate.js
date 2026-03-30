const BASE_URL = "http://localhost:3000";

/**
 * POST /api/ai/validate-request
 * @param {string} text    - The request text to validate
 * @param {string} type    - "LEAVE" | "CERTIFICATE"
 * @param {string} token   - Auth token (student or admin)
 * @returns {{ validity, issues[], suggestedRewrite } | null}
 */
export const validateAIRequest = async (text, type = "LEAVE", token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/validate-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, type }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[AI:validate] Request failed:", err.message);
    return null;
  }
};
