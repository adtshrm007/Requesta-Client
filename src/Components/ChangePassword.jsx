import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { updatePassword } from "../utils/UPDATEPassword";
import Loader from "./Loader";
import gsap from "gsap";
import { ShieldCheck, KeyRound, ArrowRight, Eye, EyeOff, Lock } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(true);

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  async function handleClickOnChangePassword() {
    if (!otp.trim()) { toast.error("Enter the OTP"); return; }
    if (!password.trim()) { toast.error("Enter the Password"); return; }
    setLoader(true);
    setPage(false);
    try {
      const res = await updatePassword(otp, password);
      if (res) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <img src={logo} alt="Requesta" className="w-5 h-5" />
              </div>
              <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                REQUESTA
              </span>
            </div>
          </Link>
          <Link to="/studentdashboard">
            <button className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all font-mooxy">
              ← Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        {page && (
          <div ref={cardRef} className="w-full max-w-[420px] opacity-0">
            {/* Icon + Heading */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-4">
                <Lock size={24} className="text-indigo-400" />
              </div>
              <h1 className="font-growmajour text-[28px] text-white leading-tight">Change Password</h1>
              <p className="text-white/40 font-mooxy text-sm mt-2 max-w-[280px]">
                Enter the OTP sent to your registered email, then set your new password.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              {/* OTP */}
              <div>
                <label className="block text-white/50 font-mooxy text-xs mb-2 uppercase tracking-wider">
                  One-Time Password (OTP)
                </label>
                <div className="relative">
                  <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter your OTP"
                    onChange={(e) => setOTP(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-white/50 font-mooxy text-xs mb-2 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-10 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleClickOnChangePassword}
                className="group w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-mooxy flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-1"
              >
                Update Password
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {loader && (
          <div className="flex flex-col items-center gap-3">
            <Loader />
            <p className="text-white/40 font-mooxy text-sm">Updating password…</p>
          </div>
        )}
      </div>
    </div>
  );
}
