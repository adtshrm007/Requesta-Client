import axios from "axios";
export const submitCertificate=async(certificateData)=>{
    try{
        const accessToken=localStorage.getItem("accessToken");
        const response=await axios.post("http://localhost:3000/api/certificate/submitCertificate",certificateData,
            {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch(err) {
        console.error(err);
        return err;
    }
}