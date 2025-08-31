import axios from "axios";
export const changeAdminPassword=async(otp,password)=>{
    try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "http://localhost:3000/api/adminregister/changepassword",
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