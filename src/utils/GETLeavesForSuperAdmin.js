import axios from "axios";
export const getSuperAdminLeaves = async () => {
  try {
    const adminAccessToken=localStorage.getItem("adminaccessToken");
        const response=await axios.get("http://localhost:3000/api/leave/leavesForSuperAdmin",
            {
                headers:{
                    Authorization:`Bearer ${adminAccessToken}`
                }
            }
        )
        return response.data;

    }
  catch(err){
    console.log(err);
  }
};
