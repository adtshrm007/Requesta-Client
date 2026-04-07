import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.svg.png";
import { Link } from "react-router-dom";
import { fetchAdmin } from "../utils/GETAdminData";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import gsap from "gsap";
import { Eye, EyeOff, ArrowRight, KeyRound, ShieldCheck, Users, BarChart3, Settings } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [adminID, setAdminId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const panelRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(panelRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 })
      .fromTo(formRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
  }, []);

  const handleAdminLogin = async () => {
    if (!adminID.trim()) { toast.error("Please enter admin ID"); return; }
    if (!password.trim()) { toast.error("Enter the password"); return; }
    setLoginPage(false); setLoader(true);
    const res = await fetchAdmin(adminID, password);
    if (res) { toast.success("Admin Logged In Successfully"); navigate("/admindashboard"); }
    else { setLoginPage(true); setLoader(false); toast.error(res?.message || "Admin not found"); }
  };

  const inputClass =
    "w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 font-mooxy text-sm outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#111827] flex">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Left Panel — Branding */}
      <div
        ref={panelRef}
        className="hidden lg:flex flex-col justify-between w-[42%] bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-transparent border-r border-white/5 p-10 relative overflow-hidden opacity-0"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <img src={logo} alt="Requesta" className="w-5 h-5" />
          </div>
          <span className="font-growmajour text-[20px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            REQUESTA
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-6">
          <h2 className="font-growmajour text-[36px] leading-tight text-white">
            Admin{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Control Panel.
            </span>
          </h2>
          <p className="text-white/40 font-mooxy text-sm leading-relaxed max-w-[300px]">
            Manage student leave and certificate requests efficiently. Review, approve, and communicate — all in one place.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: Users, text: "Approve student & faculty leave requests", color: "text-purple-400" },
              { icon: BarChart3, text: "View analytics and request trends", color: "text-indigo-400" },
              { icon: Settings, text: "Manage admins and departmental access", color: "text-amber-400" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-3 text-white/50 font-mooxy text-sm">
                <Icon size={15} className={`${color} flex-shrink-0`} />
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/20 font-mooxy text-xs">
          © {new Date().getFullYear()} Requesta. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Form */}
      <div ref={formRef} className="flex-1 flex items-center justify-center px-5 opacity-0">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <img src={logo} alt="Requesta" className="w-5 h-5" />
            </div>
            <span className="font-growmajour text-[18px] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              REQUESTA
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mooxy mb-3">
              <ShieldCheck size={11} />
              Admin Access
            </div>
            <h1 className="font-growmajour text-[30px] text-white leading-tight">Admin Login</h1>
            <p className="text-white/40 font-mooxy text-sm mt-1.5">
              Sign in to manage institutional requests
            </p>
          </div>

          {loginPage && (
            <div className="flex flex-col gap-4">
              {/* Admin ID */}
              <div className="relative">
                <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Admin ID"
                  className={`${inputClass} pl-10`}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>

              {/* Password mode */}
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

              {/* Login button */}
              <button
                onClick={handleAdminLogin}
                className="group w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-mooxy flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] mt-1"
              >
                Sign In as Admin
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Back to home link */}
              <div className="text-center mt-2">
                <Link to="/">
                  <span className="text-white/35 hover:text-white/60 font-mooxy text-sm cursor-pointer transition-colors">
                    ← Back to home
                  </span>
                </Link>
              </div>
            </div>
          )}

          {loader && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <Loader />
              <p className="text-white/40 font-mooxy text-sm">Authenticating…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
