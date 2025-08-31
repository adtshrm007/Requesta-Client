import { useState } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { fetchAdmin } from "../utils/GETAdminData";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { sendOTP } from "../utils/SENDOTPforAdmin";
import { loginAdminUsingEmail } from "../utils/GETAdminDataUsingEmail";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminID, setAdminId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [loginWithPassword, setLoginWithPassword] = useState(true);
  const [otpBox, setOTPBox] = useState(false);
  const [otp, setOTP] = useState("");

  const handleAdminLogin = async () => {
    if (!adminID.trim()) {
      toast.error("Please enter admin ID");
      return;
    }
    setLoginPage(false);
    setLoader(true);
    if (loginWithPassword) {
      if (!password.trim()) {
        toast.error("Enter the password");
        setLoginPage(true);
        setLoader(false);
        return;
      }
      const res = await fetchAdmin(adminID, password);
      if (res) {
        toast.success("Admin Logged In Successfully");
        navigate("/admindashboard");
      } else {
        setLoginPage(true);
        setLoader(false);
        toast.error(res.message || "Admin not found");
      }
    }
    if (loginWithEmail) {
      if (!email) {
        toast.error("Enter the email");
        setLoginPage(true);
        setLoader(false);
        return;
      }
      if (!otp) {
        toast.error("Enter the OTP");
        setLoginPage(true);
        setLoader(false);
        return;
      }
      const res = await loginAdminUsingEmail(adminID, email, otp);
      if (res) {
        toast.success("Admin Logged In Successfully");
        navigate("/admindashboard");
      } else if (!res) {
        setLoader(false);
        setLoginPage(true);
        setOTPBox(false);
      } else {
        toast.error(res.message || "Admin not found");
        setLoginPage(true);
        setLoader(false);
      }
    }
  };
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleClickOnGetOTP() {
    if (!adminID) {
      toast.error("Enter the AdminID");
      setLoginPage(true);
      setLoader(false);
      return;
    }
    if (!email) {
      toast.error("Enter the registered email");
      setLoginPage(true);
      setLoader(false);
      return;
    }
    try {
      const res = await sendOTP(adminID, email);
      if (res) {
        setOTPBox(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleClickOnLoginWithEmail() {
    setLoginWithEmail(!loginWithEmail);
    setLoginWithPassword(!loginWithPassword);
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black px-4">
        {/* Header */}
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex flex-col items-center mb-10">
          <h2 className="flex items-center gap-2 font-radonregular text-white text-[40px]">
            <img src={logo} alt="Logo" className="h-[50px]" />
            Requesta
          </h2>
          <h3 className="text-[#777777] font-growmajour text-[32px] mt-2">
            Admin Login
          </h3>
        </div>

        {/* Login Form */}
        {loginPage && (
          <div className="flex flex-col gap-5 w-full max-w-[320px]">
            <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
              <input
                type="text"
                placeholder="Admin Id"
                className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>
            {loginWithPassword && (
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden flex justify-center items-center mr-2">
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
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {otpBox && (
              <div className="bg-[#0D0D0D] rounded-[20px] overflow-hidden">
                <input
                  type="text"
                  placeholder="Enter the OTP"
                  className="w-full h-[45px] px-4 bg-transparent text-white outline-none font-mooxy"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
            )}
            <p
              className="text-white text-white font-mooxy ml-2 underline cursor-pointer"
              onClick={handleClickOnLoginWithEmail}
            >
              {loginWithPassword ? "Login with Email?" : "Login with password?"}
            </p>
            {loginWithEmail && (
              <button
                className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
                onClick={handleClickOnGetOTP}
              >
                Get OTP
              </button>
            )}
            <button
              className="w-full h-[45px] rounded-[20px] bg-white text-black font-mooxy cursor-pointer"
              onClick={handleAdminLogin}
            >
              Login
            </button>
          </div>
        )}
        {loader && <Loader />}
      </div>
    </>
  );
}
