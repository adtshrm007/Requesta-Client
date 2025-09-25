import axios from "axios";

export const getAdminLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
      "http://localhost:3000/api/adminLeave/getLeave",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data
  } catch (err) {
    console.error(err);
  }
};
