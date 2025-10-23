import axios from "axios";

export const getLeavesForDepartmentalAdmin = async () => {
  try {
    const adminAccessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "https://requesta-server-3.onrender.com/api/leave/leavesForDepartmentalAdmin",
      {
        headers: {
            Authorization: `Bearer ${adminAccessToken}`,
        },
      }
    );
    return response.data;
  }
    catch (err) {
        console.log(err);
    }
}   