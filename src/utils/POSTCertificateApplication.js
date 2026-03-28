import axios from "axios";

export const submitCertificate = async (certificateData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/certificate/submitCertificate",
      certificateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Certificate submission error:", err?.response?.data || err.message);
    throw err;
  }
};