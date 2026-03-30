const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * GET /api/analytics/advanced
 * @param {string} token - Admin auth token
 * @returns {{ frequentApplicants, leaveReasons, monthlyTrend, deptDistribution, certByType } | null}
 */
export const getAdvancedAnalytics = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/advanced`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[Analytics:advanced] Request failed:", err.message);
    return null;
  }
};
