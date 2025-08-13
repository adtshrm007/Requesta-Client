import axios from "axios";
export const getStudents = async () => {
  try {
    const accessToken=localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "http://localhost:3000/api/adminregister/students",{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
