import axios from "axios";
import { toast } from "react-toastify";

export const postStudentData = async (studentData) => {
  try {
    const postData = await axios.post(
      "http://localhost:3000/api/studentregister/register",
      studentData
    );
    toast.success("Registered Successfully");
    return postData.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      toast.error(err.response.data.message || "Invalid input");
    } else {
      toast.error("Server error while registering student.");
    }
    return null; // Important: return null on error so the calling function can handle it
  }
};
