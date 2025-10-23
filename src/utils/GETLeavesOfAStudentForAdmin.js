import axios from "axios";

export const getLeavesOfAStudentForAdmin = async (studentId) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/adminregister/studentRequests",{
        params:{studentId},
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if(response.status==200){
      return response.data;
    }
  } catch (err) {
    if(err.response&&err.response.status===404){
      return { message: "No leaves found for this student" };
    }
    console.error("Error fetching leaves:", err);
    if (err.response && err.response.data) {
      return { error: err.response.data.error || "An error occurred" };
    }
    if (err.message) {
      return { error: err.message };
    }
    
    return null;
  }
}