import axios from "axios";
export const getLeaves = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const showLeaves = await axios.get(
      "https://requesta-server-3.onrender.com/api/studentregister/getLeaves",
      {
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
      }
      

    )
    return showLeaves.data
  } catch (err) {
    
    return err;
  }
};
