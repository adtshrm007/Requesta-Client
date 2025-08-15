import axios from "axios";

export const getLeavesOfAStudentForAdmin = async (studentId) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "http://localhost:3000/api/adminregister/studentRequests",{
        params:{studentId},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if(response.status==200){
      return response.data;
    }
    return response.data;
  } catch (err) {
    if(err.response&&err.response.status===404){
      console.error("No leaves found for this student");
      return { message: "No leaves found for this student" };
    }
    console.error("Error fetching leaves:", err);
    if (err.response && err.response.data) {
      return { error: err.response.data.error || "An error occurred" };
    }
    if (err.message) {
      return { error: err.message };
    }
    console.error("An unexpected error occurred:", err);
    
    return null;
  }
}