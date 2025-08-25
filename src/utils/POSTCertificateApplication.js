import axios from "axios";
export const submitCertificate=async(certificateData)=>{
    try{
        const accessToken=localStorage.getItem("accessToken");
        const response=await axios.post("http://localhost:3000/api/certificate/submitCertificate",certificateData,
            {
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type":"multipart/form-data"
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error(err);
        return err;
    }
}