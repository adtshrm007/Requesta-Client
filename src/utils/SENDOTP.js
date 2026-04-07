import axios from "axios";
import { toast } from "react-toastify";

export const sendOTP = async (regNo, email) => {
  try {
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/studentregister/otp",
      {
        registrationNumber: regNo,
        email: email,
      }
    );

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
