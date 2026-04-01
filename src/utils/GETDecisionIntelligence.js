const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * GET /api/analytics/decision-intelligence
 * @param {string} token - Admin auth token
 * @returns {object | null}
 */
export const getDecisionIntelligence = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/decision-intelligence`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[Analytics:DI] Request failed:", err.message);
    return null;
  }
};
