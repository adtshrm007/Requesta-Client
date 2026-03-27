import axios from "axios";

export const updateAdmin = async (updateData) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/adminregister/update",
      updateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Update admin error:", err?.response?.data || err.message);
    throw err;
  }
};
