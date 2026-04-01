const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * POST /api/ai/system-insights
 * @param {object} analyticsData - The role-specific analytics data
 * @param {string} token - Admin auth token
 * @returns {{ trends[], alerts[], suggestions[], advancedAnalytics, generatedAt } | null}
 */
export const getSystemInsights = async (analyticsData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/system-insights`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ analyticsData }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("[AI:insights] Request failed:", err.message);
    return { error: err.message };
  }
};
