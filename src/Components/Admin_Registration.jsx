import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";

export default function AdminRegister() {
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
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Registration Number"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
             
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="text"
              placeholder="Branch"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
             
          </div>
          <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
            <input
              type="date"
              placeholder="Batch Year"
              className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
            />
             
          </div>
          <Link to='/adminlogin'><button className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer">
            Register as Admin
          </button></Link>
        </div>
      </div>
    </>
  );
}
