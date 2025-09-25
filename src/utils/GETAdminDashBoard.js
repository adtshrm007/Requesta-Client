import axios from "axios";

export const getAdminDashboard = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "http://localhost:3000/api/adminregister/dashboard",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    return err;
  }
};
