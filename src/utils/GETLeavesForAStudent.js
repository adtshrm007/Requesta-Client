import axios from "axios";
export const getLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const showLeaves = await axios.get(
      "http://localhost:3000/api/studentregister/getLeaves",
      {
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
      }
      

    );
    return showLeaves.data
  } catch (err) {
    console.log(err);
    return err;
  }
};
