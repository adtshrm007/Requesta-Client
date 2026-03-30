const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * POST /api/ai/approval-suggestion
 * @param {{ reason, duration, userHistory }} payload
 * @param {string} token - Admin auth token
 * @returns {{ decision, confidence, reasoning } | null}
 */
export const getApprovalSuggestion = async (payload, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/approval-suggestion`, {
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
    console.error("[AI:approval] Request failed:", err.message);
    return null;
  }
};
