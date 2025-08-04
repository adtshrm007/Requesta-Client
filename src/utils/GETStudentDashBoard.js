import axios from "axios";
export const fetchCurrentStudent = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:3000/api/studentregister/dashboard",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Logged-in student:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching student:",
      error.response?.data || error.message
    );
  }
};
