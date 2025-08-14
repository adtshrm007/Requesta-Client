import axios from "axios"

export const submitLeaves=async(leavedata)=>{
    try{
        const accessToken=localStorage.getItem("accessToken")
        const response=await axios.post("http://localhost:3000/api/leave/submitLeaves",leavedata,
            {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            }

    )
        ;
        console.log(response.data);
        return response.data;

    }
    catch(err){
        console.error(err);
        return err;

    }
}