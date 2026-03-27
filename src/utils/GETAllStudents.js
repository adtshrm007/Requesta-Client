import axios from "axios";
export const getStudents = async () => {
  try {
    const accessToken=localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/adminregister/students",{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching students:", err?.response?.data || err.message);
    return [];
  }
};
