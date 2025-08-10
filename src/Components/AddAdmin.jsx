import { Link } from "react-router-dom";
import { postAdminData } from "../utils/POSTAdminData";
import logo from "../assets/logo.svg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddAdmin = () => {
  const navigate=useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminMobileNumber, setAdminMobileNumber] = useState("");
  const [adminDepartment, setAdminDepartment] = useState("");
  const [adminID, setAdminID] = useState("");

  async function handleRegister() {
    const newAdmin = {
      adminID: adminID,
      name: adminName,
      mobileNumber: adminMobileNumber,
      department: adminDepartment,
    };

    const result = await postAdminData(newAdmin);

    if (result) {
      navigate("/adminlogin");
    }
  }
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
            <img src={logo} alt="Logo" className="h-[50px]" />
            Requesta
          </h2>
          <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
            Add Admin
          </h3>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-5 w-full max-w-[320px]">
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Admin Id"
              onChange={(e)=>setAdminID(e.target.value)}
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Name"
              onChange={(e)=>setAdminName(e.target.value)}
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Mobile No."
              onChange={(e)=>setAdminMobileNumber(e.target.value)}
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Department"
              onChange={(e)=>setAdminDepartment(e.target.value)}
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
          </div>
            <button className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer" onClick={handleRegister}>
              Submit Changes
            </button>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
