import axios from "axios";
import { toast } from "react-toastify";
export const fetchAdmin = async (adminID,password) => {
  try {
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminregister/get",
      {
        adminID,
        password
      }
    );

    if (response.data && response.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.setItem("adminaccessToken", response.data.accessToken);
      return response.data;
    } else {
      toast.error("Admin not found");
      return null;
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      toast.error("Admin not found");
    } else {
      console.error("Server error:", err.message);
    }
    return null;
  }
};
