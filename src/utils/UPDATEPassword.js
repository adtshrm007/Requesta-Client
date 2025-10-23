import axios from "axios";
export const updatePassword = async (otp, password) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/studentregister/changepassword",
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
