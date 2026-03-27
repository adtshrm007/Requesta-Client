import axios from "axios";

export const getAdminDashboard = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/adminregister/dashboard",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.error("Dashboard fetch error:", err?.response?.data || err.message);
    throw err;
  }
};

export const getAdminDashboardStats = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/adminregister/dashboard-stats",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Dashboard stats fetch error:", err?.response?.data || err.message);
    throw err;
  }
};
