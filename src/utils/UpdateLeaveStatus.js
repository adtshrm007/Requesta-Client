import axios from "axios";
export const updateLeaveStatus = async (leaveId,status) => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.put(
      "http://localhost:3000/api/leave/updateLeaves",
      {leaveId,status} ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Leave status updated:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating leave status:", err.response?.data || err.message);
    return null;
  }
}