import axios from "axios";
export const showAllCertificates=async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
        "https://requesta-server-3.onrender.com/api/studentregister/getCertificates",
        {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }
        );
        return response.data;
    } catch (err) {
       
        return err;
    }
    
}