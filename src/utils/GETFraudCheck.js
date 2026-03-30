const BASE_URL = "https://requesta-server-3.onrender.com";

/**
 * GET /api/ai/check-fraud?studentId=...
 * @param {string} studentId
 * @param {string} token - Admin auth token
 * @returns {{ riskLevel, flagReason, stats } | null}
 */
export const getFraudCheck = async (studentId, token) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/ai/check-fraud?studentId=${encodeURIComponent(studentId)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[AI:fraud] Request failed:", err.message);
    return null;
  }
};
