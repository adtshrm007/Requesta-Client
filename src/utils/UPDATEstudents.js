import axios from "axios";

export const updateStudent = async (studentData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "http://localhost:3000/api/studentregister/update",
      studentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Logged-in student:", response.data.data);
    return response.data;
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
    return null;
  }
};
