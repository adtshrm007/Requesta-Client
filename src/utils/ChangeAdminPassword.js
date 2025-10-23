import axios from "axios";
export const changeAdminPassword=async(otp,password)=>{
    try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/adminregister/changepassword",
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
}