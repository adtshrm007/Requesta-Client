import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updatePassword } from "../utils/UPDATEPassword";
import Loader from "./Loader";
export default function ChangePassword() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(true);
  async function handleClickOnChangePassword() {
    if (!otp.trim()) {
      toast.error("Enter the OTP");
    }
    if (!password.trim()) {
      toast.error("Enter the Password");
    }
    setLoader(true);
    setPage(false);
    try {
      const res = await updatePassword(otp, password);
      if (res) {
        console.log(res);
        toast.success(res);
        navigate("/studentdashboard");
      } else {
        setPage(true);
        setLoader(false);
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="h-auto">
        {page && (
          <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full justify-self-center max-w-[1200px] h-[64px] text-white flex items-center justify-evenly px-5">
              <Link to="/">
                <div className="flex items-center w-[220px] h-[100%] font-growmajour text-[22px] cursor-pointer ">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-[25px] h-[25px] mr-2"
                  />
                  <p>REQUESTA</p>
                </div>
              </Link>

              <div className="flex items-center gap-3 text-[#777777] font-mooxy text-[14px] sm:text-[15px]bg-slate-100">
                <Link to="/studentdashboard">
                  <p className="bg-white text-black px-3 sm:px-4 py-[6px] rounded-full cursor-pointer">
                    Dashboard
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center mb-10 mt-20">
              <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
                <img src={logo} alt="Logo" className="h-[50px]" />
                Requesta
              </h2>
              <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
                Change Password
              </h3>
            </div>
            <div className="w-[350px] h-auto justify-self-center">
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden mt-7">
                <input
                  type="text"
                  placeholder="Enter the OTP"
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden mt-7">
                <input
                  type="text"
                  placeholder="Enter the new Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                />
              </div>

              <motion.button
                className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer mt-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClickOnChangePassword}
              >
                Change Password
              </motion.button>
            </div>
          </>
        )}
      </div>

      {loader && <Loader />}
    </>
  );
}
