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
        console.log(response.data);
        return response.data;

    }
    catch(err){
        console.log(err);
        return err;
    }
}