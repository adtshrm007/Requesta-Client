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
  const [email, setEmail] = useState("");
  const [batchYear, setbatchYear] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleRegister() {
    const newStudent = {
      registrationNumber: regNo,
      name: name,
      email: email,
      password: password,
      branch: branch,
      year: batchYear,
    };

    const result = await postStudentData(newStudent);

   
  }
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="flex items-center gap-2 font-radonregular text-white text-3xl sm:text-4xl lg:text-5xl">
            <img src={logo} alt="Logo" className="h-10 sm:h-12 lg:h-14" />
            Requesta
          </h2>
          <h3 className="text-[#777777] font-growmajour text-xl sm:text-2xl lg:text-3xl mt-2">
            Student Login
          </h3>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-5 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px]">
          <ToastContainer position="top-right" autoClose={3000} />

          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Registration Number"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              onChange={(e) => setregNo(e.target.value)}
            />
          </div>

          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Email"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="email"
              placeholder="Password"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy text-sm sm:text-base"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="bg-gradient-to-r from-[#1a1a1a] via-[#0D0D0D] to-[#1a1a1a] rounded-[12px] overflow-hidden border border-white/10">
            <label
              htmlFor="branch"
              className="block px-4 pt-2 text-xs sm:text-sm text-gray-300 font-mooxy"
            >
              Branch:
            </label>

            <select
              id="branch"
              name="branch"
              className="w-full h-[45px] px-4 outline-none font-mooxy text-sm sm:text-base appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 transition-all duration-200"
              value={branch}
              required
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">--Select Branch--</option>
              <option value="Computer Science And Engineering">
                Computer Science
              </option>
              <option value="Electronics And Communication">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <label
              htmlFor="year"
              className="block px-4 pt-2 text-xs sm:text-sm text-white font-mooxy"
            >
              Batch Year(Passing out Year):
            </label>

            <select
              id="year"
              name="year"
              className="w-full h-[45px] px-4 outline-none  font-mooxy text-sm sm:text-base appearance-none cursor-pointer hover:bg-white/5 focus:bg-white/10 transition-all duration-200"
              value={batchYear}
              required
              onChange={(e) => setbatchYear(e.target.value)}
            >
              <option value="">--Select Batch Year--</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <button
            className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer text-sm sm:text-base hover:bg-gray-200 transition"
            onClick={handleRegister}
          >
            Register as Student
          </button>
        </div>
      </div>
    </>
  );
}
