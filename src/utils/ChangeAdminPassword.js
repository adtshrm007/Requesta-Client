import axios from "axios";
export const changeAdminPassword=async(oldPassword, newPassword)=>{
    try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/adminregister/changepassword",
      { oldPassword, newPassword },{
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