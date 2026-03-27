const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/**
 * GET audit logs for a student leave request
 * @param {string} requestId
 * @param {string} token - admin auth token
 */
export const getLeaveAuditLogs = async (requestId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/leave/requests/${requestId}/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("[AuditLogs] Fetch failed:", err);
    return [];
  }
};

/**
 * GET audit logs for an admin leave request
 */
export const getAdminLeaveAuditLogs = async (requestId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/adminLeave/requests/admin/${requestId}/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("[AuditLogs] Fetch failed:", err);
    return [];
  }
};

/**
 * GET audit logs for a certificate request
 */
export const getCertificateAuditLogs = async (requestId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/api/certificate/requests/cert/${requestId}/logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("[AuditLogs] Fetch failed:", err);
    return [];
  }
};
