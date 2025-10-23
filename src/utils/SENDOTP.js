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
    if (err.status === 404) {
      toast.error("Wrong email or registration number");
      return err.message;
    } else {
      return err.message;
    }
  }
};
