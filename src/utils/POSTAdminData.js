import axios from "axios";
export const postAdminData = async (adminData) => {
  try {
    const token = localStorage.getItem("adminaccessToken");
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminregister/register",
      adminData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error registering admin:", err.response?.data?.message || err.message);
    return null;
  }
};
