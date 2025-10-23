import axios from "axios";
import { toast } from "react-toastify";
export const loginAdminUsingEmail=async(adminID,email,otp)=>{
    try {
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminregister/email",
      {
        adminID: adminID,
        email: email,
        otp: otp,
      }
    );
    if (response.status === 201) {
      toast.error("Wrong OTP!!");
      return;
    }
    if (response.data) {
      localStorage.setItem("adminaccessToken", response.data.accessToken);
      toast.success("Logged In Successfully");
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
}