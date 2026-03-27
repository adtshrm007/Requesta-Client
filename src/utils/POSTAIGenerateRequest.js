const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * POST /api/ai/generate-request
 * @param {string} rawText - raw student description
 * @param {string} type - "LEAVE" | "CERTIFICATE"
 * @param {string} token - auth token (student or admin)
 */
export const generateAIRequest = async (rawText, type = "LEAVE", token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/generate-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rawText, type }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("[AI] Request failed:", err);
    return null;
  }
};
