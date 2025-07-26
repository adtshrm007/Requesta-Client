import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import StudentRegister from "./Student_Registration";
import { useState } from "react";
const StudentProfile=()=>{

  const[editProfile,setEditProfile] = useState(false)

  function handleClickOnEditProfile(){
    setEditProfile(!editProfile)
  }

  console.log(editProfile)

    return(
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
          <Link to="/studentdashboard"><p className="bg-white text-black px-4 py-[6px] rounded-full cursor-pointer">
            Dashboard
          </p></Link>
          <p onClick={handleClickOnEditProfile} className="bg-[#191919] text-white px-4 py-[6px] rounded-full cursor-pointer">
            Edit Profile
          </p>
        </div>
     
      </div>
         <div className="w-[960px] h-[48px] justify-self-center mt-10">
            <h1 className="text-white text-[24px] gap-none font-radonregular">Aditya Sharma</h1>
            <h2 className="text-[#777777] text-[24px] font-growmajour">Student</h2>
         </div>
         <div className="w-[960px] h-[225px] justify-self-center mt-20">
            <p className="text-[#777777] text-[16px] font-radonregular">Profile Info</p>
            <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">Registration Number</p>
            <p className="text-[16px] font-[500] font-mooxy text-[#777777]">123456789</p>
            <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">Branch</p>
            <p className="text-[16px] font-[500] font-mooxy text-[#777777]">CST</p>
            <p className="text-[16px] font-[500] font-radonregular mt-10 text-white">Year</p>
            <p className="text-[16px] font-[500] font-mooxy text-[#777777]">2024</p>
         </div>
         {editProfile&&(<StudentRegister/>)}
        </>

        
    )

}

export default StudentProfile;