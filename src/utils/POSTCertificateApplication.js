import axios from "axios";

export const submitCertificate = async (certificateData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/certificate/createCertificate",
      certificateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Certificate submission error:", err?.response?.data || err.message);
    throw err;
  }
};