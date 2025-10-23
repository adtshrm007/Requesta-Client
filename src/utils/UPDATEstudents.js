import axios from "axios";
import { toast } from "react-toastify";
export const updateStudent = async (studentData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "https://requesta-server-3.onrender.com/api/studentregister/update",
      studentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      }
    );
    toast.success("Profile Updated Successfully")
    return response.data;
  } catch (err) {
    toast.error("This email is already registered")
    return err.response?.data || err.message || "An error occurred while updating student data.";
  }
};
