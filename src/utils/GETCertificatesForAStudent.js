import axios from "axios";
export const showAllCertificates=async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
        "http://localhost:3000/api/studentregister/getCertificates",
        {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }
        );
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
    
}