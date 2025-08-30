import logo from "../assets/logo.svg.png";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { fetchStudentData } from "../utils/GETstudentData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { loginStudentUsingEmail } from "../utils/GETStudentDataUsingEmail";
import { sendOTP } from "../utils/SENDOTP";
export default function StudentLoginRegister() {
  const navigate = useNavigate();
  const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginWithPassword, setLoginWithPassword] = useState(true);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [getOTP, setGetOTP] = useState(false);
  const [otpBox, setOTPBox] = useState(false);
  const [otp, setOTP] = useState("");
  async function handleLogin() {
    if (!RegistrationNumber.trim()) {
      toast.error("Please enter registration number");
      return;
    }
    if (loginWithPassword) {
      if (!password.trim()) {
        toast.error("Please enter password");
        return;
      }

      try {
        const res = await fetchStudentData(RegistrationNumber, password);
        if (res) {
          navigate("/studentdashboard");
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (loginWithEmail) {
      if (!email.trim()) {
        toast.error("Please enter email");
        return;
      }

      if (!otp.trim()) {
        toast.error("Enter the OTP");
      }

      try{
        if (otp) {
        const res = await loginStudentUsingEmail(
          RegistrationNumber,
          email,
          otp
        );
        if(res){
          navigate("/studentdashboard")
        }
      }
      }
      catch(err){
        console.error(err)
      }
    }
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleClickOnLoginWithEmail() {
    setLoginWithPassword(!loginWithPassword);
    setLoginWithEmail(!loginWithEmail);
    setGetOTP(!getOTP);
  }
  async function handleClickOnGetOTP() {
    setOTPBox(true);
    try {
      const res1 = await sendOTP(RegistrationNumber, email);
      console.log(res1);
      toast.success("OTP sent successfully");
    } catch (err) {
      console.error(err);
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
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </div>
          {loginWithPassword && (
            <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden flex justify-center items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="w-[20px] h-[20px] text-white cursor-pointer mr-2 flex"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash text-white w-[20px] h-[20px]"></i>
                ) : (
                  <i className="fa-solid fa-eye text-white w-[20px] h-[20px]"></i>
                )}
              </div>
            </div>
          )}

          {loginWithEmail && (
            <>
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {otpBox && (
                <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Enter the OTP"
                    className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}

          <p
            className="text-white font-mooxy text-[16px] relative left-3 underline cursor-pointer"
            onClick={handleClickOnLoginWithEmail}
          >
            {loginWithPassword ? "Login using email?" : "Login with password?"}
          </p>

          {loginWithEmail && (
            <motion.button
              className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClickOnGetOTP}
            >
              Get OTP
            </motion.button>
          )}

          <motion.button
            className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </div>
        <Link to="/studentregister">
          <motion.button
            className="max-w-full h-[45px] min-w-[300px] rounded-[20px] bg-[#0D0D0D] text-[#777777] border-[1px] border-white font-mooxy mt-10 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Don't have an account? Register
          </motion.button>
        </Link>
      </div>
    </>
  );
}
