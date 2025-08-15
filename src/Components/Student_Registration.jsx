import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { postStudentData } from "../utils/POSTstudentData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function StudentRegister() {
  const [regNo, setregNo] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [batchYear, setbatchYear] = useState("");
  const navigate = useNavigate();
  async function handleRegister() {
    const newStudent = {
      registrationNumber: regNo,
      name: name,
      mobileNumber: mobileNo,
      branch: branch,
      year: batchYear,
    };

    const result = await postStudentData(newStudent);

    if (result) {
      navigate("/studentlogin");
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
            Student Login
          </h3>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-5 w-full max-w-[320px]">
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Registration Number"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
              onChange={(e) => setregNo(e.target.value)}
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Mobile No."
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div className="bg-gradient-to-r from-[#1a1a1a] via-[#0D0D0D] to-[#1a1a1a] rounded-[12px] overflow-hidden border border-white/10">
            <label
              htmlFor="branch"
              className="block px-4 pt-2 text-sm text-gray-300 font-mooxy"
            >
              Branch:
            </label>

            <select
              id="branch"
              name="branch"
              className="w-full h-[45px] px-4 outline-none font-mooxy appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 transition-all duration-200"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">--Select Branch--</option>
              <option value="Computer Science And Engineering">Computer Science</option>
              <option value="Electronics And Communication">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Batch Year"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
              onChange={(e) => setbatchYear(e.target.value)}
            />
          </div>

          <button
            className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
            onClick={handleRegister}
          >
            Register as Student
          </button>
        </div>
      </div>
    </>
  );
}
