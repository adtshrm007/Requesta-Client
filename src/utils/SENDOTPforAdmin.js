import axios from "axios";
import { toast } from "react-toastify";

export const sendOTP = async (adminID, email) => {
  try {
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminregister/otp",
      {
        adminID: adminID,
        email: email,
      }
    );

    toast.success("OTP sent successfully")

    return response.data;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404) {
      toast.error("Wrong email or registration number");
    } else if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Network error or server timeout");
    }
    throw err;
  }
};
