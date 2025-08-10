import axios from "axios";

export const updateAdmin = async (adminData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      "http://localhost:3000/api/adminregister/update",
      adminData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Admin Updated successfully:",response.data.data);
    return response.data.data
  } catch (err) {
    return err;
  }
};
