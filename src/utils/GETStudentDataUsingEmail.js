import axios from "axios";

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
    if (response.data) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
