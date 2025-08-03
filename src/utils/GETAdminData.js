import axios from "axios";

export const fetchAdmin = async (adminID) => {
  try {
    const response = await axios.get("http://localhost:3000/api/adminregister/", {
      params: { adminID },
    });

    if (response.data && response.status === 200) {
      console.log("Admin found:", response.data);
      return response.data;
    } else {
      console.log("Admin not found");
      return null;
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log("Admin not found");
    } else {
      console.error("Server error:", err.message);
    }
    return null;
  }
};
