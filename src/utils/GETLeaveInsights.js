const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * GET /api/analytics/leave-insights
 * Returns hard leave data: top reasons, monthly stats, peak days, status breakdown.
 * @param {string} token - Admin auth token
 * @returns {object | null}
 */
export const getLeaveInsights = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/analytics/leave-insights`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error("[Analytics:LeaveInsights] Server error:", res.status, errBody);
      return { error: errBody.message || errBody.error || `Server error (${res.status})` };
    }
    return await res.json();
  } catch (err) {
    console.error("[Analytics:LeaveInsights] Request failed:", err.message);
    return { error: `Network error: ${err.message}` };
  }
};
