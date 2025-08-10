import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCurrentStudent } from "../utils/GETStudentDashBoard";
import { updateStudent } from "../utils/UPDATEstudents";
import { useNavigate } from "react-router-dom";
const StudentProfile = () => {
  const [home, setHome] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [name,setName]=useState("");
  const [regnNo,setregnNo]=useState("");
  const [branch,setBranch]=useState("");
  const [year,setYear]=useState("");
  const [mobileNumber,setmobileNumber]=useState("");

  const navigate=useNavigate();
  useEffect(()=>{
    const getProfile=async()=>{
      const student=await fetchCurrentStudent();
      if(student){
        setName(student.name);
        setBranch(student.branch);
        setregnNo(student.registrationNumber);
        setmobileNumber(student.mobileNumber);
        setYear(student.year)
      }


    }
    getProfile();

  },[])

  const EditProfile = async () => {
  const updatedStudent = {
    registrationNumber: regnNo,
    name,
    mobileNumber,
    branch,
    year,
  };
  const postEditedData = await updateStudent(updatedStudent);
  return postEditedData;
};



    

  

  function handleClickOnEditProfile() {
    setHome(!home);
    setEditProfile(!editProfile);
  }
  function handleEditProfile(){
    console.log(name,regnNo,branch,mobileNumber,year)
    EditProfile();
    navigate("/studentdashboard")
  }

  return (
    <>
      <div className="w-full max-w-[960px] h-[64px] mx-auto flex items-center justify-between px-4 text-white">
        {/* Logo & Title */}
        <Link to="/">
          <div className="flex items-center font-growmajour text-[22px] cursor-pointer">
            <img src={logo} alt="logo" className="w-[25px] h-[25px] mr-2" />
            <p>REQUESTA</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4 text-[#777777] font-mooxy text-[15px]">
          <Link to="/studentdashboard">
            <p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
              Dashboard
            </p>
          </Link>
          <p
            onClick={handleClickOnEditProfile}
            className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer"
          >
            Edit Profile
          </p>
        </div>
      </div>
      {home && (
        <>
          <div className="w-[960px] h-[48px] justify-self-center mt-10">
            <h1 className="text-white text-[24px] gap-none font-radonregular">
              {name}
            </h1>
            <h2 className="text-[#777777] text-[24px] font-growmajour">
              Student
            </h2>
          </div>
          <div className="flex w-[950px] h-auto ng-slate-700  justify-self-center">
            <div className="w-[960px] h-[225px] justify-self-center mt-20">
              <p className="text-[#777777] text-[16px] font-radonregular">
                Profile Info
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Registration Number
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {regnNo}
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Branch
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {branch}
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Year
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {year}
              </p>
            </div>
            <div className="w-[960px] h-[225px] justify-self-center mt-20">
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Name
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {name}
              </p>
              <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">
                Phone Number
              </p>
              <p className="text-[16px] font-[500] font-mooxy text-[#777777]">
                {mobileNumber}
              </p>
            </div>
          </div>
        </>
      )}
      {editProfile && (
        <>
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
            {/* Header */}
            <div className="flex flex-col items-center mb-10">
              <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
                <img src={logo} alt="Logo" className="h-[50px]" />
                Requesta
              </h2>
              <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
                Change Credentials
              </h3>
            </div>

            {/* Login Form */}
            <div className="flex flex-col gap-5 w-full max-w-[320px]">
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Registration Number"
                  defaultValue={regnNo}
                  onChange={(e)=>setregnNo(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Mobile No."
                  defaultValue={mobileNumber}
                  onChange={(e)=>setmobileNumber(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Branch"
                  defaultValue={branch}
                  onChange={(e)=>setBranch(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Batch Year"
                  defaultValue={year}
                  onChange={(e)=>setYear(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
                <button className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer" onClick={handleEditProfile}>
                  Submit Changes
                </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentProfile;
