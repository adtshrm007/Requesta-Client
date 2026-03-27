import axios from "axios";
export const getLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/studentregister/getLeaves",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error("getLeaves error:", err?.response?.data || err.message);
    return [];
  }
};
