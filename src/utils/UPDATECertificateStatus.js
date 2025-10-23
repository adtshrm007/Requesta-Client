import axios from "axios";

export const updateCertificateStatus = async (formData) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/certificate/updateCertificates",
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
