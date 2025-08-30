import axios from "axios";
import { toast } from "react-toastify";
export const loginStudentUsingEmail = async (regNo, email, otp) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/studentregister/emailLogin",
      {
        registrationNumber: regNo,
        email: email,
        otp: otp,
      }
    );
    if (response.status === 201) {
      toast.error("Wrong OTP!!");
      return;
    }
    if (response.data) {
      localStorage.setItem("accessToken", response.data.accessToken);
      toast.success("Logged In Successfully");
      return response.data;
    }
  } catch (err) {
    console.err(err);
  }
};
