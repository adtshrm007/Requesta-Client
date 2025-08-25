import axios from "axios";

export const updateCertificateStatus = async (formData) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "http://localhost:3000/api/certificate/updateCertificates",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      "Error updating Certificat status:",
      err.response?.data || err.message
    );
    return null;
  }
};
