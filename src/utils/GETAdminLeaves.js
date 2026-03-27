import axios from "axios";

export const getAdminLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/adminLeave/getLeave",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    // backend wraps this in { data: [] }
    const payload = response.data;
    if (payload && Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload)) return payload;
    return [];
  } catch (err) {
    console.error("getAdminLeaves error:", err?.response?.data || err.message);
    return [];
  }
};
