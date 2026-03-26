import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { fetchStudentData } from "../utils/GETstudentData";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { loginStudentUsingEmail } from "../utils/GETStudentDataUsingEmail";
import { sendOTP } from "../utils/SENDOTP";
import Loader from "./Loader";
import gsap from "gsap";
import { Eye, EyeOff, ArrowRight, Mail, KeyRound, Hash, ShieldCheck, CheckCircle, Clock, Download } from "lucide-react";

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
  const [loader, setLoader] = useState(false);
  const [login, setLogin] = useState(true);

  const panelRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(panelRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 })
      .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
  }, []);

  async function handleLogin() {
    if (!RegistrationNumber.trim()) { toast.error("Please enter registration number"); return; }
    if (loginWithPassword) {
      if (!password.trim()) { toast.error("Please enter password"); return; }
      setLogin(false); setLoader(true);
      try {
        const res = await fetchStudentData(RegistrationNumber, password);
        if (!res) { setLogin(true); setLoader(false); }
        if (res) navigate("/studentdashboard");
      } catch (err) { console.log(err); }
    }
    if (loginWithEmail) {
      if (!email.trim()) { toast.error("Please enter email"); return; }
      if (!otp.trim()) { toast.error("Enter the OTP"); return; }
      setLogin(false); setLoader(true);
      try {
        if (otp) {
          const res = await loginStudentUsingEmail(RegistrationNumber, email, otp);
          if (!res) { setLoader(false); setLogin(true); setOTPBox(false); }
          if (res) navigate("/studentdashboard");
        }
      } catch (err) { console.error(err); }
    }
  }

  function handleClickOnLoginWithEmail() {
    setLoginWithPassword(!loginWithPassword);
    setLoginWithEmail(!loginWithEmail);
    setGetOTP(!getOTP);
  }

  async function handleClickOnGetOTP() {
    if (!RegistrationNumber) { toast.error("Enter the registration number"); return; }
    if (!email) { toast.error("Enter the email"); return; }
    if (email && RegistrationNumber) setOTPBox(true);
    try {
      const res1 = await sendOTP(RegistrationNumber, email);
      toast.success("OTP sent successfully");
    } catch (err) { console.error(err); }
  }

  const inputClass =
    "w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Left Panel — Branding */}
      <div
        ref={panelRef}
        className="hidden lg:flex flex-col justify-between w-[42%] bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent border-r border-white/5 p-10 relative overflow-hidden opacity-0"
      >
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
            <img src={logo} alt="Requesta" className="w-5 h-5" />
          </div>
          <span className="font-growmajour text-[20px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            REQUESTA
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-6">
          <h2 className="font-growmajour text-[36px] leading-tight text-white">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              student.
            </span>
          </h2>
          <p className="text-white/40 font-mooxy text-sm leading-relaxed max-w-[300px]">
            Sign in to your portal to manage leave applications, track status, and download approved certificates.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: CheckCircle, text: "Track your leave status in real time", color: "text-green-400" },
              { icon: Download, text: "Download approved certificates instantly", color: "text-indigo-400" },
              { icon: Clock, text: "Get notified on every status change", color: "text-amber-400" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-3 text-white/50 font-mooxy text-sm">
                <Icon size={15} className={`${color} flex-shrink-0`} />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer text */}
        <p className="relative z-10 text-white/20 font-mooxy text-xs">
          © {new Date().getFullYear()} Requesta. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Form */}
      <div ref={formRef} className="flex-1 flex items-center justify-center px-5 opacity-0">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <img src={logo} alt="Requesta" className="w-5 h-5" />
            </div>
            <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              REQUESTA
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-growmajour text-[30px] text-white leading-tight">Student Login</h1>
            <p className="text-white/40 font-mooxy text-sm mt-1.5">
              Sign in to access your dashboard
            </p>
          </div>

          {login && (
            <div className="flex flex-col gap-4">
              {/* Method toggle */}
              <div className="flex bg-white/5 border border-white/8 rounded-xl p-1">
                <button
                  onClick={() => !loginWithPassword && handleClickOnLoginWithEmail()}
                  className={`flex-1 py-2 rounded-lg text-sm font-mooxy transition-all ${loginWithPassword ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-white/40 hover:text-white"}`}
                >
                  Password
                </button>
                <button
                  onClick={() => !loginWithEmail && handleClickOnLoginWithEmail()}
                  className={`flex-1 py-2 rounded-lg text-sm font-mooxy transition-all ${loginWithEmail ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-white/40 hover:text-white"}`}
                >
                  Email OTP
                </button>
              </div>

              {/* Reg Number */}
              <div className="relative">
                <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Registration Number"
                  className={`${inputClass} pl-10`}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>

              {/* Password mode */}
              {loginWithPassword && (
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`${inputClass} pl-10 pr-11`}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              )}

              {/* Email OTP mode */}
              {loginWithEmail && (
                <>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="text"
                      placeholder="Registered Email"
                      className={`${inputClass} pl-10`}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {otpBox && (
                    <div className="relative">
                      <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className={`${inputClass} pl-10`}
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </div>
                  )}
                  <button
                    onClick={handleClickOnGetOTP}
                    className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-indigo-500/25 text-indigo-300 text-sm font-mooxy transition-all"
                  >
                    {otpBox ? "Resend OTP" : "Get OTP"}
                  </button>
                </>
              )}

              {/* Login button */}
              <button
                onClick={handleLogin}
                className="group w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-mooxy flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-1"
              >
                Sign In
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Register link */}
              <div className="text-center mt-2">
                <span className="text-white/35 font-mooxy text-sm">Don't have an account? </span>
                <Link to="/studentregister">
                  <span className="text-indigo-400 hover:text-indigo-300 font-mooxy text-sm cursor-pointer transition-colors">
                    Register here
                  </span>
                </Link>
              </div>
            </div>
          )}

          {loader && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <Loader />
              <p className="text-white/40 font-mooxy text-sm">Signing you in…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
