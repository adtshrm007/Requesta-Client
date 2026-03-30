const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * GET /api/ai/system-insights
 * @param {string} token - Admin auth token
 * @returns {{ trends[], alerts[], suggestions[], stats, generatedAt } | null}
 */
export const getSystemInsights = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/system-insights`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[AI:insights] Request failed:", err.message);
    return null;
  }
};
