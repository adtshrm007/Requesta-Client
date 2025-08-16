import axios from "axios"
export const getAllLeaves=async()=>{
    try{
        const adminAccessToken=localStorage.getItem("adminaccessToken");
        const response=await axios.get("http://localhost:3000/api/leave/showLeaves",
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