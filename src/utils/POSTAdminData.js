import axios from "axios";
export const postAdminData = async (adminData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/adminregister/register",
      adminData
    );
    console.log("Admin registered successfully:", response.data);
    return response.data
  } catch (err) {
    console.error("Error registering admin:", err.mesaage);
  }
};
