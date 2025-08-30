import axios from "axios";
export const updatePassword = async (otp, password) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "http://localhost:3000/api/studentregister/changepassword",
      { otp, password },{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
      }
    );
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
};
