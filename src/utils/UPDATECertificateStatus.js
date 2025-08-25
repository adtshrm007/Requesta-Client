import axios from "axios";
export const updateCertificateStatus = async (certId,status,remark) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "http://localhost:3000/api/certificate/updateCertificates",
      {certId,status,remark} ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error updating leave status:", err.response?.data || err.message);
    return null;
  }
}