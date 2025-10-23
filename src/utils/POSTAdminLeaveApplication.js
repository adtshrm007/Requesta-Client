import axios from "axios";
import { toast } from "react-toastify";
export const submitAdminLeaveApplication = async (leavedata) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.post(
      "https://requesta-server-3.onrender.com/api/adminLeave/leave",
      leavedata,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
