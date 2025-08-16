import axios from "axios";

export const getAllCertificatesRequests=async()=>{
    try{
        const accessToken=localStorage.getItem("adminaccessToken");
        const response=await axios.get("http://localhost:3000/api/certificate/showCertificates",{
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