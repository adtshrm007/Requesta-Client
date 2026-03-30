const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * GET /api/analytics/summary
 * @param {string} token - admin auth token
 */
export const getAnalyticsSummary = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("[Analytics] Fetch failed:", err);
    return null;
  }
};
