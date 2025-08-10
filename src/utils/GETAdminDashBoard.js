import axios from "axios";

export const getAdminDashboard = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:3000/api/adminregister/dashboard",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Current Logged In Admin:", response.data.data);
    return response.data.data;
  } catch (err) {
    return err;
  }
};
