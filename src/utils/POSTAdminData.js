import axios from "axios";
export const postAdminData = async (adminData) => {
  try {
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminregister/register",
      adminData
    );

    return response.data
  } catch (err) {
    console.error("Error registering admin:", err.mesaage);
  }
};
