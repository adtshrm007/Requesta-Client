import axios from "axios";
import { toast } from "react-toastify";

export const fetchStudentData = async (regnNo) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/studentregister/",
      {
        params: { registrationNumber: regnNo },
      }
    );

    if (response.data) {
      toast.success("Logged In Successfully");
      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error.response.data.message || "Student not found");
    } else {
      toast.error("Something went wrong while fetching student data.");
      console.error("Error fetching student data:", error);
    }
  }
};
