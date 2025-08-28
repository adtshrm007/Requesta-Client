import axios from "axios";
import { toast } from "react-toastify";

export const sendOTP = async (regNo, email) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/studentregister/otp",
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
