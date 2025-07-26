import logo from "../assets/logo.svg.png";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function StudentLoginRegister() {
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
          <Link to="/studentdashboard">
            <motion.button className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Login
            </motion.button>
          </Link>
        </div>
        <Link to='/studentregister'><motion.button className="w-[320px] h-[45px] rounded-[20px] bg-[#0D0D0D] text-[#777777] border-[1px] border-white font-mooxy mt-10 cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          Don't have an account? Register
        </motion.button></Link>
      </div>
    </>
  );
}
