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
    return response.data;
  } catch (err) {
    return err.response?.data || err.message || "An error occurred while updating student data.";
  }
};
