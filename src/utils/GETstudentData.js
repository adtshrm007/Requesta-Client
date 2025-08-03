import axios from "axios";

export const fetchStudentData = async (regnNo) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/studentregister/",{
      params:{ registrationNumber:regnNo}}
    );
    if(response.data){
      console.log("Student Found:",response.data)
    }
    else{
      console.log("Not found")
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
};
