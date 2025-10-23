import axios from "axios";

export const getFacultyLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const response = await axios.get(
        "https://requesta-server-3.onrender.com/api/adminLeave/getFacultyLeave",
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