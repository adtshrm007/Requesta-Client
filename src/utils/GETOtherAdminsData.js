import axios from "axios";
export const getAdmins = async () => {
  try {
    const accessToken = localStorage.getItem("adminaccessToken");
    const res = await axios.get(
      "http://localhost:3000/api/adminregister/admins",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
