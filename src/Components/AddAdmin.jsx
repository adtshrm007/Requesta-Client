import { Link } from "react-router-dom";
import { postAdminData } from "../utils/POSTAdminData";
import logo from "../assets/logo.svg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddAdmin = () => {
  const navigate = useNavigate();
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
      navigate("/admindashboard");
    }
  }
  return (
    <>
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-4">
    {/* Header */}
    <div className="flex flex-col items-center mb-8 sm:mb-10">
      <h2 className="flex items-center gap-2 font-radonregular text-white text-3xl sm:text-4xl lg:text-5xl">
        <img src={logo} alt="Logo" className="h-10 sm:h-12 lg:h-14" />
        Requesta
      </h2>
      <h3 className="text-[#777777] font-growmajour text-xl sm:text-2xl lg:text-3xl mt-2 text-center">
        Add Admin
      </h3>
    </div>

    {/* Form */}
    <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="bg-[#0D0D0D] rounded-[16px] sm:rounded-[20px] overflow-hidden">
        <input
          type="text"
          placeholder="Admin Id"
          onChange={(e) => setAdminID(e.target.value)}
          className="w-full h-[45px] sm:h-[50px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
        />
      </div>

      <div className="bg-[#0D0D0D] rounded-[16px] sm:rounded-[20px] overflow-hidden">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setAdminName(e.target.value)}
          className="w-full h-[45px] sm:h-[50px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
        />
      </div>

      <div className="bg-[#0D0D0D] rounded-[16px] sm:rounded-[20px] overflow-hidden">
        <input
          type="text"
          placeholder="Mobile No."
          onChange={(e) => setAdminMobileNumber(e.target.value)}
          className="w-full h-[45px] sm:h-[50px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
        />
      </div>

      {/* Branch Select */}
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#0D0D0D] to-[#1a1a1a] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10">
        <label
          htmlFor="branch"
          className="block px-4 pt-2 text-xs sm:text-sm text-gray-300 font-mooxy"
        >
          Branch:
        </label>

        <select
          id="branch"
          name="branch"
          className="w-full h-[45px] sm:h-[50px] px-4 outline-none font-mooxy text-sm sm:text-base appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 transition-all duration-200"
          value={adminDepartment}
          onChange={(e) => setAdminDepartment(e.target.value)}
        >
          <option value="">--Select Branch--</option>
          <option value="Computer Science And Engineering">Computer Science</option>
          <option value="Electronics And Communication">Electronics</option>
          <option value="Mechanical">Mechanical</option>
        </select>
      </div>

      <button
        className="w-full h-[45px] sm:h-[50px] rounded-[16px] sm:rounded-[20px] bg-white text-black font-mooxy text-sm sm:text-base cursor-pointer hover:bg-gray-200 transition"
        onClick={handleRegister}
      >
        Submit Changes
      </button>
    </div>
  </div>
</>
  );
};

export default AddAdmin;
