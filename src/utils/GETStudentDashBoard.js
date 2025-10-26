import axios from "axios";
export const fetchCurrentStudent = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/studentregister/dashboard",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching student:",
      error.response?.data || error.message
    );
  }
};
