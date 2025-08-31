import axios from "axios";
import { toast } from "react-toastify";
export const updateAdmin = async (adminData) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "http://localhost:3000/api/adminregister/update",
      adminData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Admin Profile updated successfully!");
    return response.data.data
  } catch (err) {
    toast.error("This email is already registered");
    return err;
  }
};
