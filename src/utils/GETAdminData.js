import axios from "axios";
import { toast } from "react-toastify";
export const fetchAdmin = async (adminID) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/adminregister/get",
      {
        params: { adminID },
      }
    );

    if (response.data && response.status === 200) {
      console.log("Admin found:", response.data);
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", response.data.accessToken);
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
