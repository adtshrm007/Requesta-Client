import axios from "axios";

export const getAllCertificatesRequests=async()=>{
    try{
        const accessToken=localStorage.getItem("adminaccessToken");
        const response=await axios.get("https://requesta-server-3.onrender.com/api/certificate/showCertificates",{
            headers:{   
                Authorization:`Bearer ${accessToken}`
            }


        })
        return response.data;
        


    }
    catch(err){
        return err;
    }

}