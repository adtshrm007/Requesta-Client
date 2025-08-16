import axios from "axios";
export const postAdminData = async (adminData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/adminregister/register",
      adminData
    );

    return response.data
  } catch (err) {
    console.error("Error registering admin:", err.mesaage);
  }
};
