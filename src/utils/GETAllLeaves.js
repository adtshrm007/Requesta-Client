import axios from "axios"
export const getAllLeaves=async()=>{
    try{
        const adminAccessToken=localStorage.getItem("adminaccessToken");
        const response=await axios.get("https://requesta-server-3.onrender.com/api/leave/showLeaves",
            {
                headers:{
                    Authorization:`Bearer ${adminAccessToken}`
                }
            }
        )
        return response.data;

    }
    catch(err){
        return err;
    }
}